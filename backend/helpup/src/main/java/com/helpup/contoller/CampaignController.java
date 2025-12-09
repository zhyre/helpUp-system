package com.helpup.contoller;

import com.helpup.dto.CampaignDTO;
import com.helpup.entity.Campaign;
import com.helpup.service.CampaignService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public List<CampaignDTO> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/{id}")
    public Optional<CampaignDTO> getCampaign(@PathVariable Long id) {
        return campaignService.getCampaignById(id);
    }

    @GetMapping("/organization/{organizationId}")
    public List<CampaignDTO> getCampaignsByOrganization(@PathVariable Long organizationId) {
        return campaignService.getCampaignsByOrganizationId(organizationId);
    }

    @PostMapping
    public Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignService.saveCampaign(campaign);
    }

    @PutMapping("/{id}")
    public CampaignDTO updateCampaign(@PathVariable Long id, @RequestBody Campaign campaign) {
        // For update, we need to work with the actual Campaign entity first
        // Fetch existing campaign to preserve organization relationship
        Campaign existingCampaign = campaignService.getCampaignEntityById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + id));

        // Update only the fields that should be editable
        existingCampaign.setName(campaign.getName());
        existingCampaign.setDescription(campaign.getDescription());
        existingCampaign.setTargetAmount(campaign.getTargetAmount());
        existingCampaign.setStartDate(campaign.getStartDate());
        existingCampaign.setEndDate(campaign.getEndDate());

        // Preserve organization if not provided in update
        if (campaign.getOrganization() == null) {
            // Keep existing organization
        } else {
            existingCampaign.setOrganization(campaign.getOrganization());
        }

        // Save and return as DTO
        Campaign savedCampaign = campaignService.saveCampaign(existingCampaign);
        return campaignService.convertToDTO(savedCampaign);
    }

    @DeleteMapping("/{id}")
    public void deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
    }
}
