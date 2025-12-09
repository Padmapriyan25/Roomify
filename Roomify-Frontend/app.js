/* ============================================================
   GLOBAL SETTINGS
============================================================ */
const API_BASE = "http://localhost:8080";

let currentUser = JSON.parse(localStorage.getItem("roomifyUser"));

/* ============================================================
   LOGIN
============================================================ */
function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    // DEMO login
    let demoUsers = [
        { email: "admin@roomify.com", password: "admin123", role: "ADMIN", id: 1, name: "Admin User" },
        { email: "staff@roomify.com", password: "staff123", role: "STAFF", id: 2, name: "Staff User" },
        { email: "customer@roomify.com", password: "cust123", role: "CUSTOMER", id: 3, name: "Customer User" }
    ];

    let user = demoUsers.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid login details");
        return;
    }

    localStorage.setItem("roomifyUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
}


/* ============================================================
   LOGOUT
============================================================ */
function logout() {
    localStorage.removeItem("roomifyUser");
    window.location.href = "index.html";
}


/* ============================================================
   INITIAL LOAD
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    if (!currentUser) return;

    document.getElementById("userRole").innerText = currentUser.role;

    applyRoleRestrictions();

    loadRooms();
    loadCustomers();
    loadBookings();
});


/* ============================================================
   ROLE-BASED UI RESTRICTIONS
============================================================ */
function applyRoleRestrictions() {
    if (!currentUser) return;

    const role = currentUser.role;

    // Hide dashboard stats for CUSTOMER
    if (role === "CUSTOMER") {
        document.querySelector(".cards").style.display = "none";
        document.getElementById("addRoomBtn").style.display = "none";
        document.getElementById("addCustomerBtn").style.display = "none";
    }

    // STAFF cannot add rooms
    if (role === "STAFF") {
        document.getElementById("addRoomBtn").style.display = "none";
    }
}


/* ============================================================
   NAVIGATION
============================================================ */
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}


/* ============================================================
   ROOMS
============================================================ */
function loadRooms() {
    fetch(`${API_BASE}/rooms`)
        .then(res => res.json())
        .then(rooms => {
            let body = document.getElementById("roomsTableBody");
            body.innerHTML = "";

            rooms.forEach(room => {
                body.innerHTML += createRoomRow(room);
            });

            document.getElementById("totalRooms").innerText = rooms.length;
        });
}

function createRoomRow(room) {
    let role = currentUser.role;

    let actions = `
        <button class="pill-btn"
            onclick="openBookingModal(${room.id}, '${room.roomNumber}', '${room.type}', ${room.price}, ${room.available})">
            Book
        </button>
    `;

    if (role === "ADMIN" || role === "STAFF") {
        actions += `
            <button class="edit" onclick="openRoomForm(${room.id}, '${room.roomNumber}', '${room.type}', ${room.price}, ${room.available})">Edit</button>
        `;
    }

    if (role === "ADMIN") {
        actions += `<button class="delete" onclick="deleteRoom(${room.id})">Delete</button>`;
    }

    return `
        <tr>
            <td>${room.id}</td>
            <td>${room.roomNumber}</td>
            <td>${room.type}</td>
            <td>${room.price}</td>
            <td>${room.available ? "Yes" : "No"}</td>
            <td>${actions}</td>
        </tr>
    `;
}


/* ---------------- ROOM MODAL ---------------- */
function openRoomForm(id = null, number = "", type = "", price = "", available = true) {
    document.getElementById("roomModal").style.display = "flex";

    document.getElementById("roomId").value = id || "";
    document.getElementById("roomNumber").value = number;
    document.getElementById("roomType").value = type;
    document.getElementById("roomPrice").value = price;
    document.getElementById("roomAvailable").checked = available;

    document.getElementById("roomModalTitle").innerText = id ? "Edit Room" : "Add Room";
}

function closeRoomForm() {
    document.getElementById("roomModal").style.display = "none";
}

function saveRoom() {
    let id = document.getElementById("roomId").value;
    let number = document.getElementById("roomNumber").value;
    let type = document.getElementById("roomType").value;
    let price = document.getElementById("roomPrice").value;
    let available = document.getElementById("roomAvailable").checked;

    let room = { roomNumber: number, type, price, available };

    let method = id ? "PUT" : "POST";
    let url = id ? `${API_BASE}/rooms/${id}` : `${API_BASE}/rooms`;

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room)
    })
        .then(res => res.json())
        .then(() => {
            closeRoomForm();
            loadRooms();
        });
}

function deleteRoom(id) {
    if (!confirm("Delete this room?")) return;

    fetch(`${API_BASE}/rooms/${id}`, { method: "DELETE" })
        .then(() => loadRooms());
}



/* ============================================================
   CUSTOMERS
============================================================ */
function loadCustomers() {
    // CUSTOMER cannot see this section
    if (currentUser.role === "CUSTOMER") {
        document.getElementById("customersTableBody").innerHTML =
            "<tr><td colspan='5'>Access denied</td></tr>";
        return;
    }

    fetch(`${API_BASE}/customers`)
        .then(res => res.json())
        .then(customers => {
            let body = document.getElementById("customersTableBody");
            body.innerHTML = "";

            customers.forEach(c => {
                let actions = "";

                if (currentUser.role !== "CUSTOMER") {
                    actions = `
                        <button class="edit" onclick="openCustomerForm(${c.id}, '${c.name}', '${c.email}', '${c.phone}')">Edit</button>
                        <button class="delete" onclick="deleteCustomer(${c.id})">Delete</button>
                    `;
                }

                body.innerHTML += `
                    <tr>
                        <td>${c.id}</td>
                        <td>${c.name}</td>
                        <td>${c.email}</td>
                        <td>${c.phone}</td>
                        <td>${actions}</td>
                    </tr>
                `;
            });

            document.getElementById("totalCustomers").innerText = customers.length;
        });
}


/* ---------------- CUSTOMER MODAL ---------------- */
function openCustomerForm(id = null, name = "", email = "", phone = "") {
    document.getElementById("customerModal").style.display = "flex";

    document.getElementById("customerId").value = id || "";
    document.getElementById("customerName").value = name;
    document.getElementById("customerEmail").value = email;
    document.getElementById("customerPhone").value = phone;

    document.getElementById("customerModalTitle").innerText = id ? "Edit Customer" : "Add Customer";
}

function closeCustomerForm() {
    document.getElementById("customerModal").style.display = "none";
}

function saveCustomer() {
    let id = document.getElementById("customerId").value;
    let name = document.getElementById("customerName").value;
    let email = document.getElementById("customerEmail").value;
    let phone = document.getElementById("customerPhone").value;

    let customer = { name, email, phone };

    let method = id ? "PUT" : "POST";
    let url = id ? `${API_BASE}/customers/${id}` : `${API_BASE}/customers`;

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(res => res.json())
        .then(() => {
            closeCustomerForm();
            loadCustomers();
        });
}

function deleteCustomer(id) {
    if (!confirm("Delete this customer?")) return;

    fetch(`${API_BASE}/customers/${id}`, { method: "DELETE" })
        .then(() => loadCustomers());
}



/* ============================================================
   BOOKINGS
============================================================ */
function loadBookings() {
    fetch(`${API_BASE}/bookings`)
        .then(res => res.json())
        .then(bookings => {
            let body = document.getElementById("bookingsTableBody");
            body.innerHTML = "";

            bookings.forEach(b => {
                // CUSTOMER sees only their bookings
                if (currentUser.role === "CUSTOMER" && b.user.id !== currentUser.id) return;

                let actions = "";

                if (currentUser.role !== "STAFF" && currentUser.role !== "ADMIN" && b.user.id !== currentUser.id) {
                    actions = "";
                } else {
                    actions = `<button class="delete" onclick="deleteBooking(${b.id})">Cancel</button>`;
                }

                body.innerHTML += `
                    <tr>
                        <td>${b.id}</td>
                        <td>${b.room.roomNumber}</td>
                        <td>${b.user.name}</td>
                        <td>${b.checkIn}</td>
                        <td>${b.checkOut}</td>
                        <td>${b.status}</td>
                        <td>${actions}</td>
                    </tr>
                `;
            });

            document.getElementById("totalBookings").innerText = bookings.length;
        });
}



/* ---------------- BOOKING MODAL ---------------- */
let selectedRoomId = null;

function openBookingModal(id, number, type, price, available) {
    selectedRoomId = id;

    document.getElementById("bookingModal").style.display = "flex";
    document.getElementById("bookingRoomLabel").innerText = `Room ${number}`;
    document.getElementById("bookingRoomType").innerText = type;
    document.getElementById("bookingRoomPrice").innerText = `₹${price}`;
    document.getElementById("bookingAvailabilityNote").innerText =
        available ? "Room is available" : "Room is NOT available";
}

function closeBookingModal() {
    document.getElementById("bookingModal").style.display = "none";
}

function saveBooking() {
    let checkIn = document.getElementById("bookingCheckIn").value;
    let checkOut = document.getElementById("bookingCheckOut").value;

    if (!checkIn || !checkOut) {
        alert("Select both dates");
        return;
    }

    let booking = {
        checkIn,
        checkOut,
        status: "BOOKED"
    };

    fetch(`${API_BASE}/bookings/${selectedRoomId}/${currentUser.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    })
        .then(res => res.json())
        .then(() => {
            closeBookingModal();
            loadBookings();
        });
}

function deleteBooking(id) {
    if (!confirm("Cancel this booking?")) return;

    fetch(`${API_BASE}/bookings/${id}`, { method: "DELETE" })
        .then(() => loadBookings());
}
