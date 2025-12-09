package com.roomify.service;

import com.roomify.entity.Customer;
import com.roomify.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) {
        this.repo = repo;
    }

    public Customer addCustomer(Customer c) {
        return repo.save(c);
    }

    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    public Customer updateCustomer(int id, Customer updated) {
        Customer c = repo.findById(id).orElse(null);
        if (c == null) return null;

        c.setName(updated.getName());
        c.setEmail(updated.getEmail());
        c.setPhone(updated.getPhone());

        return repo.save(c);
    }

    public boolean deleteCustomer(int id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
