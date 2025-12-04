package com.helpup.repository;

import com.helpup.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByOrganization_OrganizationID(Long organizationId);
}
