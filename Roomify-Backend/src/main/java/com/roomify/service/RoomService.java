package com.roomify.service;

import com.roomify.entity.Room;
import com.roomify.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository repo;

    public RoomService(RoomRepository repo) {
        this.repo = repo;
    }

    public Room addRoom(Room room) {
        return repo.save(room);
    }

    public List<Room> getAllRooms() {
        return repo.findAll();
    }

    public Room updateRoom(int id, Room updatedRoom) {
        Room room = repo.findById(id).orElse(null);
        if (room == null) return null;

        room.setRoomNumber(updatedRoom.getRoomNumber());
        room.setType(updatedRoom.getType());
        room.setPrice(updatedRoom.getPrice());
        room.setAvailable(updatedRoom.isAvailable());

        return repo.save(room);
    }

    public boolean deleteRoom(int id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
