package com.helpup.service;

import com.helpup.entity.Organization;
import com.helpup.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Optional<Organization> getOrganizationById(Long id) {
        return organizationRepository.findById(id);
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
}
