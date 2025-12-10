package com.helpup.contoller;

import com.helpup.dto.UserLoginDTO;
import com.helpup.repository.UserRepository;
import com.helpup.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.helpup.entity.User;
import com.helpup.entity.Organization;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> requestData) {
        try {
            // Extract user data
            User user = new User();
            user.setFirstName((String) requestData.get("first_name"));
            user.setLastName((String) requestData.get("last_name"));
            user.setEmail((String) requestData.get("email"));
            user.setContactNumber((String) requestData.get("contactNumber"));
            user.setPassword((String) requestData.get("password"));
            user.setRole((String) requestData.get("role"));

            // Save user
            User savedUser = userRepository.save(user);

            // If user is organization, create organization record
            if ("ORGANIZATION".equals(user.getRole())) {
                Organization organization = new Organization();
                organization.setName((String) requestData.get("organization_name"));
                organization.setDescription((String) requestData.get("organization_description"));
                organization.setAddress((String) requestData.get("organization_address"));
                organization.setUser(savedUser);
                organization.setApprovalStatus("pending");
                organizationRepository.save(organization);
            }

            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginRequest.getPassword())) {
            User user = userOpt.get();

            // Create DTO with organization data if user is an organization
            UserLoginDTO loginDTO = new UserLoginDTO();
            loginDTO.setUserID(user.getUserID());
            loginDTO.setFirstName(user.getFirstName());
            loginDTO.setLastName(user.getLastName());
            loginDTO.setEmail(user.getEmail());
            loginDTO.setContactNumber(user.getContactNumber());
            loginDTO.setRole(user.getRole());
            loginDTO.setWalletBalance(user.getWalletBalance());

            // Fetch organization data if user is an organization
            if ("ORGANIZATION".equalsIgnoreCase(user.getRole()) || "organization".equalsIgnoreCase(user.getRole())) {
                Optional<Organization> orgOpt = organizationRepository.findByUser_UserID(user.getUserID());
                if (orgOpt.isPresent()) {
                    Organization org = orgOpt.get();
                    loginDTO.setOrganizationID(org.getOrganizationID());
                    loginDTO.setOrganizationName(org.getName());
                }
            }

            return ResponseEntity.ok(loginDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User userDetails) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setEmail(userDetails.getEmail());
            user.setContactNumber(userDetails.getContactNumber());
            user.setRole(userDetails.getRole());
            // Note: Password should be handled separately for security
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
