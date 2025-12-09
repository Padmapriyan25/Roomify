package com.roomify.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String roomNumber;
    private String type;   // Single, Double, Suite etc.
    private double price;
    private boolean available;

    public Room() {}

    // Getters & Setters

    public int getId() {
        return id;
    }

    public void setId(int id) { this.id = id; }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getType() {
        return type;
    }

    public void setType(String type) { this.type = type; }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) { this.price = price; }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) { this.available = available; }
}
