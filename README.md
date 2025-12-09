# 🏨 Roomify – Full Stack Hotel Management System  
A complete **full-stack hotel management application** built with **Spring Boot + MySQL (Backend)** and **HTML, CSS, JavaScript (Frontend)**.  
This system supports **role-based access**, a modern UI, full CRUD operations, and real-time booking.

---

## 🔰 Badges

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.3.0-brightgreen)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JS-purple)
![Status](https://img.shields.io/badge/Project-FullStack-success)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

# ✨ Features  

## 🔐 Role-Based Authentication
- **Admin** – Full access (Rooms, Customers, Bookings CRUD)
- **Staff** – Limited access (Rooms + Customers only)
- **Customer** – Book rooms + view own bookings

## 🖥 Frontend Features
- Dark-themed modern UI  
- Dashboard with stats  
- Modal-based Add/Edit/Book  
- Responsive design  
- Real-time UI updates  

## ⚙ Backend Features
- Spring Boot REST API  
- CRUD for Rooms, Customers, Bookings  
- Booking validation  
- Exception handling  
- Layered architecture (Controller → Service → Repository)  

---

# 📁 Folder Structure

```
Roomify/
│
├── backend/
│   ├── src/main/java/com/roomify/...
│   ├── src/main/resources/application.properties
│   ├── pom.xml
│   └── target/
│
└── frontend/
    ├── index.html
    ├── dashboard.html
    ├── style.css
    └── app.js
```

---

# 🛠 Tech Stack

### Frontend  
- HTML5  
- CSS3  
- JavaScript (ES6)  
- Fetch API  
- Responsive UI  

### Backend  
- Java 17  
- Spring Boot 3  
- Spring Data JPA  
- Hibernate ORM  
- MySQL  
- Maven  

---

# 🚀 How to Run the Project

## 1️⃣ Clone the Repository

```sh
git clone https://github.com/Padmapriyan25/Roomify.git
cd Roomify
```

---

# 2️⃣ Backend Setup (Spring Boot + MySQL)

## ✔ Step 1 — Create database

```sql
CREATE DATABASE roomify;
```

## ✔ Step 2 — Update application.properties

```ini
spring.datasource.url=jdbc:mysql://localhost:3306/roomify
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## ✔ Step 3 — Run the Spring Boot Application

Run:

```
RoomifyApplication.java
```

Backend starts at:

```
http://localhost:8080
```

---

# 3️⃣ Frontend Setup

## ✔ Step 1 — Open the `frontend/` folder  
## ✔ Step 2 — Open `index.html` in your browser  
*(No server needed)*  

## ✔ Step 3 — Ensure backend is running  

Inside `app.js`, update:

```js
const API_BASE = "http://localhost:8080";
```

---

# 📸 Screenshots  

### 🖥 Login Page  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a3f6743a-4e1f-4c65-8483-c63088c5ff4f" />


### 📊 Dashboard  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e9ef3d85-1d42-420d-816a-5791e4f67595" />


### 🛏 Rooms Management  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/87ba4edc-a8e1-4e2e-9698-8e67e36106b4" />


### 📇 Customers Page  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/74cca4a0-d612-46ba-8f96-000c9bb799e0" />


### 📅 Booking Modal  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d2d1975f-cc90-4a87-95ee-9723ad6c6a25" />


---

# 🔗 API Endpoints

## Rooms
| METHOD | ENDPOINT      | DESCRIPTION     |
|--------|---------------|-----------------|
| GET    | /rooms        | Get all rooms   |
| POST   | /rooms        | Add room        |
| PUT    | /rooms/{id}   | Update room     |
| DELETE | /rooms/{id}   | Delete room     |

## Customers
| METHOD | ENDPOINT        | DESCRIPTION     |
|--------|------------------|-----------------|
| GET    | /customers       | Get all         |
| POST   | /customers       | Add customer    |
| PUT    | /customers/{id}  | Update customer |
| DELETE | /customers/{id}  | Delete customer |

## Bookings
| METHOD | ENDPOINT                      | DESCRIPTION        |
|--------|--------------------------------|--------------------|
| GET    | /bookings                      | Get all bookings   |
| POST   | /bookings/{roomId}/{userId}    | Create booking     |
| DELETE | /bookings/{id}                 | Cancel booking     |

---

# 👤 Demo Login Credentials

## Admin
```
Email: admin@roomify.com
Password: admin123
```

## Staff
```
Email: staff@roomify.com
Password: staff123
```

## Customer
```
Email: customer@roomify.com
Password: cust123
```

---

# 📢 LinkedIn Description (Copy-Paste)

🚀 **New Full Stack Project – Roomify Hotel Management System**  

I recently upgraded my backend-only hotel management API into a **complete full-stack system** featuring a modern UI, booking system, and role-based authentication.

### 🔥 Highlights:
✔ Dark UI built with HTML, CSS, JS  
✔ Fully integrated Spring Boot + MySQL  
✔ CRUD for Rooms, Customers, Bookings  
✔ Role-based login (Admin / Staff / Customer)  
✔ Modal-based booking  
✔ Clean folder structure  


#Java #SpringBoot #MySQL #JavaScript #HTML #CSS #FullStack #HotelManagement

---
