package com.roomify.controller;

import com.roomify.entity.User;
import com.roomify.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {

    private final UserService service;

    public LoginController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req) {
        User user = service.findByEmail(req.getEmail());
        if (user == null) return null;
        if (!user.getPassword().equals(req.getPassword())) return null;
        user.setPassword(null); // don't send password back
        return user;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
