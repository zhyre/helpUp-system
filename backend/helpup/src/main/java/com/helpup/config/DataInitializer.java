package com.helpup.config;

import com.helpup.entity.Campaign;
import com.helpup.entity.Donation;
import com.helpup.repository.CampaignRepository;
import com.helpup.repository.DonationRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public ApplicationRunner initializeData(
            CampaignRepository campaignRepository,
            DonationRepository donationRepository) {
        return args -> {
            try {
                // Initialize campaign totals from donations
                initializeCampaignTotals(campaignRepository, donationRepository);
                
                System.out.println("Data initialization completed successfully!");
            } catch (Exception e) {
                System.err.println("Error during data initialization: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }

    @Transactional
    private void initializeCampaignTotals(CampaignRepository campaignRepository, DonationRepository donationRepository) {
        try {
            List<Campaign> campaigns = campaignRepository.findAll();
            
            for (Campaign campaign : campaigns) {
                // Calculate total from donations
                double total = donationRepository.findAll().stream()
                        .filter(d -> d.getCampaign() != null && 
                               d.getCampaign().getCampaignID().equals(campaign.getCampaignID()) &&
                               "completed".equals(d.getStatus()))
                        .mapToDouble(Donation::getAmount)
                        .sum();
                
                // Only update if current value is 0 or null
                if (campaign.getTotalRaised() == null || campaign.getTotalRaised() == 0) {
                    campaign.setTotalRaised(total);
                    campaignRepository.save(campaign);
                }
            }
            System.out.println("Campaign totals initialized!");
        } catch (Exception e) {
            System.err.println("Error initializing campaign totals: " + e.getMessage());
        }
    }
}
