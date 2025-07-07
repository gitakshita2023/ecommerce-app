package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        
        if (userRepository.findByUsernameAndPassword("admin", "password") == null) {
            User user = new User("admin", "password");
            userRepository.save(user);
            System.out.println("✅ Demo user created: admin/password");
        }
    }
}
