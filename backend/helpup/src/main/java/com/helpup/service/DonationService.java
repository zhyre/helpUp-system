package com.helpup.service;

import com.helpup.entity.Donation;
import com.helpup.entity.Campaign;
import com.helpup.entity.User;
import com.helpup.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final UserService userService;
    private final WalletTransactionService walletTransactionService;
    private final CampaignService campaignService;

    @Autowired
    public DonationService(DonationRepository donationRepository, UserService userService, WalletTransactionService walletTransactionService, CampaignService campaignService) {
        this.donationRepository = donationRepository;
        this.userService = userService;
        this.walletTransactionService = walletTransactionService;
        this.campaignService = campaignService;
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    public Donation saveDonation(Donation donation) {
        return donationRepository.save(donation);
    }

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }

    /**
     * Get donations by user ID
     */
    public List<Donation> getDonationsByUserId(Long userId) {
        return donationRepository.findAll().stream()
                .filter(donation -> donation.getUser() != null && donation.getUser().getUserID().equals(userId))
                .toList();
    }

    /**
     * Get donations by campaign ID
     */
    public List<Donation> getDonationsByCampaignId(Long campaignId) {
        return donationRepository.findAll().stream()
                .filter(donation -> donation.getCampaign() != null && donation.getCampaign().getCampaignID().equals(campaignId))
                .toList();
    }

    /**
     * Process a donation with wallet balance deduction
     */
    @Transactional
    public Map<String, Object> processDonation(Long userId, Long campaignId, Double amount, String notes) {
        try {
            // Validate inputs
            if (userId == null || campaignId == null || amount == null) {
                throw new IllegalArgumentException("User ID, Campaign ID, and Amount are required");
            }

            if (amount <= 0) {
                throw new IllegalArgumentException("Donation amount must be positive");
            }

            // Check if user has sufficient balance
            if (!userService.hasSufficientBalance(userId, amount)) {
                Double currentBalance = userService.getWalletBalance(userId);
                throw new RuntimeException("Insufficient wallet balance. Current balance: ₱" + currentBalance + ", Required: ₱" + amount);
            }

            // Fetch user and campaign entities
            User user = userService.getUserById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            
            Campaign campaign = campaignService.getCampaignEntityById(campaignId)
                    .orElseThrow(() -> new RuntimeException("Campaign not found with ID: " + campaignId));

            // Process wallet deduction
            walletTransactionService.processDonation(userId, amount, "Donation to campaign: " + campaign.getName());

            // Create donation record
            Donation donation = new Donation();
            donation.setAmount(amount);
            donation.setDate(LocalDateTime.now());
            donation.setStatus("completed");
            donation.setType("wallet");
            donation.setNotes(notes);
            donation.setUser(user);
            donation.setCampaign(campaign);

            Donation savedDonation = donationRepository.save(donation);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("donation", savedDonation);
            response.put("newBalance", userService.getWalletBalance(userId));
            response.put("message", "Donation successful!");

            return response;
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return errorResponse;
        }
    }

    /**
     * Get donation statistics
     */
    public Map<String, Object> getDonationStats() {
        List<Donation> allDonations = donationRepository.findAll();
        
        Double totalAmount = allDonations.stream()
                .mapToDouble(Donation::getAmount)
                .sum();
        
        Long totalCount = (long) allDonations.size();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAmount", totalAmount);
        stats.put("totalCount", totalCount);
        stats.put("averageAmount", totalCount > 0 ? totalAmount / totalCount : 0.0);
        
        return stats;
    }
}
