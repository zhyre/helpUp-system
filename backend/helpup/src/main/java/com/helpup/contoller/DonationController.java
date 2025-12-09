package com.helpup.contoller;

import com.helpup.entity.Donation;
import com.helpup.service.DonationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    @GetMapping("/{id}")
    public Optional<Donation> getDonation(@PathVariable Long id) {
        return donationService.getDonationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Donation> getDonationsByUser(@PathVariable Long userId) {
        return donationService.getDonationsByUserId(userId);
    }

    @GetMapping("/campaign/{campaignId}")
    public List<Donation> getDonationsByCampaign(@PathVariable Long campaignId) {
        return donationService.getDonationsByCampaignId(campaignId);
    }

    @GetMapping("/stats")
    public Map<String, Object> getDonationStats() {
        return donationService.getDonationStats();
    }

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {
        return donationService.saveDonation(donation);
    }

    /**
     * Process a donation with wallet balance deduction
     */
    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processDonation(@RequestBody Map<String, Object> request) {
        try {
            // Debug logging
            System.out.println("Processing donation request: " + request);
            
            Long userId = Long.valueOf(request.get("userId").toString());
            Long campaignId = Long.valueOf(request.get("campaignId").toString());
            Double amount = Double.valueOf(request.get("amount").toString());
            String notes = (String) request.get("notes");

            System.out.println("Parsed values - UserID: " + userId + ", CampaignID: " + campaignId + ", Amount: " + amount);

            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be positive");
            }

            Map<String, Object> result = donationService.processDonation(userId, campaignId, amount, notes);
            
            System.out.println("Donation processing result: " + result);
            
            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception e) {
            System.err.println("Error processing donation: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
    }
}
