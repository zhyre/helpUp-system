package com.helpup.service;

import com.helpup.dto.CampaignDTO;
import com.helpup.entity.Campaign;
import com.helpup.entity.Donation;
import com.helpup.entity.Organization;
import com.helpup.repository.CampaignRepository;
import com.helpup.repository.DonationRepository;
import com.helpup.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final OrganizationRepository organizationRepository;
    private final DonationRepository donationRepository;

    @Autowired
    public CampaignService(CampaignRepository campaignRepository, OrganizationRepository organizationRepository, DonationRepository donationRepository) {
        this.campaignRepository = campaignRepository;
        this.organizationRepository = organizationRepository;
        this.donationRepository = donationRepository;
    }

    public List<CampaignDTO> getAllCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        return campaigns.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<CampaignDTO> getCampaignById(Long id) {
        Optional<Campaign> campaign = campaignRepository.findById(id);
        return campaign.map(this::convertToDTO);
    }

    public Optional<Campaign> getCampaignEntityById(Long id) {
        return campaignRepository.findById(id);
    }

    public List<CampaignDTO> getCampaignsByOrganizationId(Long organizationId) {
        List<Campaign> campaigns = campaignRepository.findByOrganization_OrganizationID(organizationId);
        return campaigns.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Campaign saveCampaign(Campaign campaign) {
        // If organization is provided with just an ID, fetch the full organization
        if (campaign.getOrganization() != null && campaign.getOrganization().getOrganizationID() != null) {
            Long orgId = campaign.getOrganization().getOrganizationID();
            Organization organization = organizationRepository.findById(orgId)
                    .orElseThrow(() -> new RuntimeException("Organization not found with id: " + orgId));
            campaign.setOrganization(organization);
        }
        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }

    public CampaignDTO convertToDTO(Campaign campaign) {
        String organizationName = null;
        Long organizationID = null;
        
        if (campaign.getOrganization() != null) {
            organizationName = campaign.getOrganization().getName();
            organizationID = campaign.getOrganization().getOrganizationID();
        }
        
        // Calculate actual total raised from donations instead of using stored value
        Double actualTotalRaised = calculateActualTotalRaised(campaign.getCampaignID());
        
        return new CampaignDTO(
                campaign.getCampaignID(),
                campaign.getName(),
                campaign.getDescription(),
                campaign.getStartDate(),
                campaign.getEndDate(),
                campaign.getTargetAmount(),
                actualTotalRaised,
                organizationName,
                organizationID
        );
    }
    
    /**
     * Calculate the actual total raised amount for a campaign by summing all donations
     */
    private Double calculateActualTotalRaised(Long campaignId) {
        List<Donation> donations = donationRepository.findAll().stream()
                .filter(donation -> donation.getCampaign() != null && donation.getCampaign().getCampaignID().equals(campaignId))
                .toList();
        
        return donations.stream()
                .mapToDouble(donation -> donation.getAmount() != null ? donation.getAmount() : 0.0)
                .sum();
    }
}
