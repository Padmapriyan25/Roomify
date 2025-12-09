package com.roomify.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate checkIn;
    private LocalDate checkOut;
    private String status; // BOOKED, CANCELLED, COMPLETED

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // customer user

    public Booking() {}

    // Getters & Setters

    public int getId() {
        return id;
    }

    public void setId(int id) { this.id = id; }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) { this.status = status; }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) { this.room = room; }

    public User getUser() {
        return user;
    }

    public void setUser(User user) { this.user = user; }
}
