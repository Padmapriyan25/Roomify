package com.roomify.controller;

import com.roomify.entity.Booking;
import com.roomify.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping("/{roomId}/{userId}")
    public Booking add(@RequestBody Booking b,
                       @PathVariable int roomId,
                       @PathVariable int userId) {
        return service.addBooking(b, roomId, userId);
    }

    @GetMapping
    public List<Booking> all() {
        return service.getAllBookings();
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable int id) {
        return service.deleteBooking(id);
    }
}
