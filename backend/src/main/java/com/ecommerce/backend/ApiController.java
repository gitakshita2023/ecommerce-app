package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        
        // Debug logs - Console mein dikhega
        System.out.println("🔍 Login attempt:");
        System.out.println("   Username: " + username);
        System.out.println("   Password: " + password);
        
        // Database se user find karo
        User user = userRepository.findByUsernameAndPassword(username, password);
        
        if (user != null) {
            System.out.println("✅ SUCCESS: User found in database!");
            System.out.println("   User ID: " + user.getId());
            return Map.of("success", true, "message", "Welcome to E-commerce!");
        } else {
            System.out.println("❌ FAILED: User NOT found in database!");
            return Map.of("success", false, "message", "Invalid credentials");
        }
    }
    
    @GetMapping("/api/test")
    public Map<String, String> test() {
        return Map.of("message", "Backend is working!");
    }
}
