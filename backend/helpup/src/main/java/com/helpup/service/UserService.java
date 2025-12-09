package com.helpup.service;

import com.helpup.entity.User;
import com.helpup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Add funds to user's wallet balance
     */
    @Transactional
    public User addToWalletBalance(Long userId, Double amount) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Double currentBalance = user.getWalletBalance() != null ? user.getWalletBalance() : 0.0;
            user.setWalletBalance(currentBalance + amount);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    /**
     * Deduct funds from user's wallet balance
     */
    @Transactional
    public User deductFromWalletBalance(Long userId, Double amount) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Double currentBalance = user.getWalletBalance() != null ? user.getWalletBalance() : 0.0;
            
            if (currentBalance < amount) {
                throw new RuntimeException("Insufficient wallet balance. Current balance: ₱" + currentBalance);
            }
            
            user.setWalletBalance(currentBalance - amount);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    /**
     * Get user's current wallet balance
     */
    public Double getWalletBalance(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            return userOptional.get().getWalletBalance() != null ? userOptional.get().getWalletBalance() : 0.0;
        }
        throw new RuntimeException("User not found with ID: " + userId);
    }

    /**
     * Check if user has sufficient balance
     */
    public boolean hasSufficientBalance(Long userId, Double requiredAmount) {
        Double currentBalance = getWalletBalance(userId);
        return currentBalance >= requiredAmount;
    }
}
