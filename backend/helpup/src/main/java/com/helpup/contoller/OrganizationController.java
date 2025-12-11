package com.helpup.contoller;

import com.helpup.entity.Organization;
import com.helpup.dto.OrganizationDTO;
import com.helpup.service.OrganizationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public List<OrganizationDTO> getAllOrganizations() {
        return organizationService.getAllOrganizations();
    }

    @GetMapping("/{id}")
    public Optional<OrganizationDTO> getOrganization(@PathVariable Long id) {
        return organizationService.getOrganizationById(id);
    }

    @GetMapping("/user/{userId}")
    public Organization getOrganizationByUserId(@PathVariable Long userId) {
        return organizationService.getOrganizationByUserId(userId);
    }

    @PostMapping
    public Organization createOrganization(@RequestBody Organization org) {
        return organizationService.saveOrganization(org);
    }

    @PutMapping("/{id}")
    public Organization updateOrganization(@PathVariable Long id, @RequestBody Organization orgDetails) {
        return organizationService.updateOrganization(id, orgDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteOrganization(@PathVariable Long id) {
        organizationService.deleteOrganization(id);
    }
}
