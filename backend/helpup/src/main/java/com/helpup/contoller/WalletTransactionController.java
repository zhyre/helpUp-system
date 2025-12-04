package com.helpup.contoller;

import com.helpup.entity.WalletTransaction;
import com.helpup.service.WalletTransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wallet-transactions")
public class WalletTransactionController {

    private final WalletTransactionService walletTransactionService;

    public WalletTransactionController(WalletTransactionService walletTransactionService) {
        this.walletTransactionService = walletTransactionService;
    }

    @GetMapping
    public List<WalletTransaction> getAllTransactions() {
        return walletTransactionService.getAllTransactions();
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
}
