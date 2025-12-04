package com.helpup.service;

import com.helpup.entity.WalletTransaction;
import com.helpup.repository.WalletTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletTransactionService {

    private final WalletTransactionRepository walletTransactionRepository;

    public WalletTransactionService(WalletTransactionRepository walletTransactionRepository) {
        this.walletTransactionRepository = walletTransactionRepository;
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
}
