package com.roomify.service;

import com.roomify.entity.Booking;
import com.roomify.entity.Room;
import com.roomify.entity.User;
import com.roomify.repository.BookingRepository;
import com.roomify.repository.RoomRepository;
import com.roomify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository repo;
    private final RoomRepository roomRepo;
    private final UserRepository userRepo;

    public BookingService(BookingRepository repo, RoomRepository roomRepo, UserRepository userRepo) {
        this.repo = repo;
        this.roomRepo = roomRepo;
        this.userRepo = userRepo;
    }

    public Booking addBooking(Booking b, int roomId, int userId) {
        Room room = roomRepo.findById(roomId).orElse(null);
        User user = userRepo.findById(userId).orElse(null);

        if (room == null || user == null) return null;

        b.setRoom(room);
        b.setUser(user);
        b.setStatus("BOOKED");

        return repo.save(b);
    }

    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    public boolean deleteBooking(int id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
