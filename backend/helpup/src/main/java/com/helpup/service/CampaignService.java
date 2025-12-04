package com.helpup.service;

import com.helpup.entity.Campaign;
import com.helpup.entity.Organization;
import com.helpup.repository.CampaignRepository;
import com.helpup.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final OrganizationRepository organizationRepository;

    public CampaignService(CampaignRepository campaignRepository, OrganizationRepository organizationRepository) {
        this.campaignRepository = campaignRepository;
        this.organizationRepository = organizationRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(Long id) {
        return campaignRepository.findById(id);
    }

    public List<Campaign> getCampaignsByOrganizationId(Long organizationId) {
        return campaignRepository.findByOrganization_OrganizationID(organizationId);
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
}
