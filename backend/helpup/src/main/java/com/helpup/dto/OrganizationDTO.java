package com.helpup.dto;

public class OrganizationDTO {
    private Long organizationID;
    private String name;
    private String description;
    private String address;
    private String contactDetails;
    private String eligibilityProof;
    private String approvalStatus;
    private Double totalRaised;

    public OrganizationDTO() {
    }

    public OrganizationDTO(Long organizationID, String name, String description, String address,
                          String contactDetails, String eligibilityProof, String approvalStatus, Double totalRaised) {
        this.organizationID = organizationID;
        this.name = name;
        this.description = description;
        this.address = address;
        this.contactDetails = contactDetails;
        this.eligibilityProof = eligibilityProof;
        this.approvalStatus = approvalStatus;
        this.totalRaised = totalRaised;
    }

    public Long getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(Long organizationID) {
        this.organizationID = organizationID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactDetails() {
        return contactDetails;
    }

    public void setContactDetails(String contactDetails) {
        this.contactDetails = contactDetails;
    }

    public String getEligibilityProof() {
        return eligibilityProof;
    }

    public void setEligibilityProof(String eligibilityProof) {
        this.eligibilityProof = eligibilityProof;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Double getTotalRaised() {
        return totalRaised;
    }

    public void setTotalRaised(Double totalRaised) {
        this.totalRaised = totalRaised;
    }
}
