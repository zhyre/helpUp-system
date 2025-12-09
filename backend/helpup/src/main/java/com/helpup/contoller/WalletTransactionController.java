package com.helpup.contoller;

import com.helpup.entity.WalletTransaction;
import com.helpup.service.WalletTransactionService;
import com.helpup.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/wallet-transactions")
public class WalletTransactionController {

    private final WalletTransactionService walletTransactionService;
    private final UserService userService;

    public WalletTransactionController(WalletTransactionService walletTransactionService, UserService userService) {
        this.walletTransactionService = walletTransactionService;
        this.userService = userService;
    }

    @GetMapping
    public List<WalletTransaction> getAllTransactions() {
        return walletTransactionService.getAllTransactions();
    }

    @GetMapping("/user/{userId}")
    public List<WalletTransaction> getTransactionsByUser(@PathVariable Long userId) {
        return walletTransactionService.getTransactionsByUserId(userId);
    }

    @GetMapping("/{id}")
    public Optional<WalletTransaction> getTransaction(@PathVariable Long id) {
        return walletTransactionService.getTransactionById(id);
    }

    @PostMapping
    public WalletTransaction createTransaction(@RequestBody WalletTransaction transaction) {
        return walletTransactionService.saveTransaction(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        walletTransactionService.deleteTransaction(id);
    }

    /**
     * Get user's wallet balance
     */
    @GetMapping("/balance/{userId}")
    public ResponseEntity<Map<String, Object>> getWalletBalance(@PathVariable Long userId) {
        try {
            Double balance = userService.getWalletBalance(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("balance", balance);
            response.put("userId", userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Process a top-up transaction
     */
    @PostMapping("/top-up")
    public ResponseEntity<Map<String, Object>> processTopUp(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            Double amount = Double.valueOf(request.get("amount").toString());
            String notes = (String) request.get("notes");

            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be positive");
            }

            WalletTransaction transaction = walletTransactionService.processTopUp(userId, amount, notes);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("transaction", transaction);
            response.put("newBalance", userService.getWalletBalance(userId));
            response.put("message", "Top-up successful!");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Check if user has sufficient balance for a transaction
     */
    @PostMapping("/check-balance")
    public ResponseEntity<Map<String, Object>> checkBalance(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            Double requiredAmount = Double.valueOf(request.get("amount").toString());

            boolean hasSufficientBalance = userService.hasSufficientBalance(userId, requiredAmount);
            Double currentBalance = userService.getWalletBalance(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("hasSufficientBalance", hasSufficientBalance);
            response.put("currentBalance", currentBalance);
            response.put("requiredAmount", requiredAmount);
            response.put("userId", userId);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
