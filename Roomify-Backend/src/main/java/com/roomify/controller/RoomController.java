package com.roomify.controller;

import com.roomify.entity.Room;
import com.roomify.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    private final RoomService service;

    public RoomController(RoomService service) {
        this.service = service;
    }

    @PostMapping
    public Room addRoom(@RequestBody Room r) {
        return service.addRoom(r);
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return service.getAllRooms();
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable int id, @RequestBody Room r) {
        return service.updateRoom(id, r);
    }

    @DeleteMapping("/{id}")
    public boolean deleteRoom(@PathVariable int id) {
        return service.deleteRoom(id);
    }
}
