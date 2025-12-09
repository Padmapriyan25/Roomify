package com.roomify.controller;

import com.roomify.entity.Customer;
import com.roomify.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public Customer addCustomer(@RequestBody Customer c) {
        return service.addCustomer(c);
    }

    @GetMapping
    public List<Customer> getAll() {
        return service.getAllCustomers();
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable int id, @RequestBody Customer c) {
        return service.updateCustomer(id, c);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable int id) {
        return service.deleteCustomer(id);
    }
}
