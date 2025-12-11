package com.helpup.service;

import com.helpup.entity.Organization;
import com.helpup.dto.OrganizationDTO;
import com.helpup.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<OrganizationDTO> getAllOrganizations() {
        return organizationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<OrganizationDTO> getOrganizationById(Long id) {
        Optional<Organization> org = organizationRepository.findById(id);
        return org.map(this::convertToDTO);
    }

    public Organization getOrganizationByUserId(Long userId) {
        return organizationRepository.findByUser_UserID(userId)
                .orElseThrow(() -> new RuntimeException("Organization not found for user id: " + userId));
    }

    public Organization saveOrganization(Organization org) {
        return organizationRepository.save(org);
    }

    public Organization updateOrganization(Long id, Organization orgDetails) {
        Optional<Organization> optionalOrg = organizationRepository.findById(id);
        if (optionalOrg.isPresent()) {
            Organization org = optionalOrg.get();
            org.setName(orgDetails.getName());
            org.setContactDetails(orgDetails.getContactDetails());
            org.setEligibilityProof(orgDetails.getEligibilityProof());
            org.setApprovalStatus(orgDetails.getApprovalStatus());
            return organizationRepository.save(org);
        } else {
            throw new RuntimeException("Organization not found with id: " + id);
        }
    }

    public void deleteOrganization(Long id) {
        organizationRepository.deleteById(id);
    }

    /**
     * Convert Organization entity to DTO with dynamically calculated totalRaised
     * Calculates totalRaised as the sum of all campaign totalRaised amounts
     */
    public OrganizationDTO convertToDTO(Organization org) {
        // Calculate total raised from all campaigns
        Double totalRaised = org.getCampaigns() != null ? 
                org.getCampaigns().stream()
                    .mapToDouble(campaign -> campaign.getTotalRaised() != null ? campaign.getTotalRaised() : 0.0)
                    .sum() : 0.0;
        
        return new OrganizationDTO(
                org.getOrganizationID(),
                org.getName(),
                org.getDescription(),
                org.getAddress(),
                org.getContactDetails(),
                org.getEligibilityProof(),
                org.getApprovalStatus(),
                totalRaised
        );
    }
}
