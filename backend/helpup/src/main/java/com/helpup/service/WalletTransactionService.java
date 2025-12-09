package com.helpup.service;

import com.helpup.entity.WalletTransaction;
import com.helpup.entity.User;
import com.helpup.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WalletTransactionService {

    private final WalletTransactionRepository walletTransactionRepository;
    private final UserService userService;

    @Autowired
    public WalletTransactionService(WalletTransactionRepository walletTransactionRepository, UserService userService) {
        this.walletTransactionRepository = walletTransactionRepository;
        this.userService = userService;
    }

    public List<WalletTransaction> getAllTransactions() {
        return walletTransactionRepository.findAll();
    }

    public Optional<WalletTransaction> getTransactionById(Long id) {
        return walletTransactionRepository.findById(id);
    }

    public WalletTransaction saveTransaction(WalletTransaction transaction) {
        return walletTransactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        walletTransactionRepository.deleteById(id);
    }

    /**
     * Get transactions for a specific user
     */
    public List<WalletTransaction> getTransactionsByUserId(Long userId) {
        return walletTransactionRepository.findAll().stream()
                .filter(transaction -> transaction.getUser() != null && transaction.getUser().getUserID().equals(userId))
                .toList();
    }

    /**
     * Process a top-up transaction
     */
    @Transactional
    public WalletTransaction processTopUp(Long userId, Double amount, String notes) {
        // Add funds to user's wallet
        User updatedUser = userService.addToWalletBalance(userId, amount);
        
        // Create transaction record
        WalletTransaction transaction = new WalletTransaction();
        transaction.setAmount(amount);
        transaction.setTransactionType("top-up");
        transaction.setDate(LocalDateTime.now());
        transaction.setNotes(notes != null ? notes : "Wallet top-up");
        transaction.setUser(updatedUser);
        
        return walletTransactionRepository.save(transaction);
    }

    /**
     * Process a donation deduction transaction
     */
    @Transactional
    public WalletTransaction processDonation(Long userId, Double amount, String notes) {
        // Deduct funds from user's wallet
        User updatedUser = userService.deductFromWalletBalance(userId, amount);
        
        // Create transaction record
        WalletTransaction transaction = new WalletTransaction();
        transaction.setAmount(amount);
        transaction.setTransactionType("donation");
        transaction.setDate(LocalDateTime.now());
        transaction.setNotes(notes != null ? notes : "Donation deduction");
        transaction.setUser(updatedUser);
        
        return walletTransactionRepository.save(transaction);
    }
}
