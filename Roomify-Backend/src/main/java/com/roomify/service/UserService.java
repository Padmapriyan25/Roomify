package com.roomify.service;

import com.roomify.entity.User;
import com.roomify.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(User user) {
        return repo.save(user);
    }

    public User findByEmail(String email) {
        return repo.findByEmail(email);
    }
}
