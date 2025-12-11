package com.helpup.dto;

import java.time.LocalDate;

public class CampaignDTO {
    private Long campaignID;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double targetAmount;
    private Double totalRaised;
    private String organizationName;
    private Long organizationID;

    public CampaignDTO() {
    }

    public CampaignDTO(Long campaignID, String name, String description, LocalDate startDate, 
                      LocalDate endDate, Double targetAmount, String organizationName, Long organizationID) {
        this.campaignID = campaignID;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.targetAmount = targetAmount;
        this.organizationName = organizationName;
        this.organizationID = organizationID;
    }

    public CampaignDTO(Long campaignID, String name, String description, LocalDate startDate, 
                      LocalDate endDate, Double targetAmount, Double totalRaised, String organizationName, Long organizationID) {
        this.campaignID = campaignID;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.targetAmount = targetAmount;
        this.totalRaised = totalRaised;
        this.organizationName = organizationName;
        this.organizationID = organizationID;
    }

    public Long getCampaignID() {
        return campaignID;
    }

    public void setCampaignID(Long campaignID) {
        this.campaignID = campaignID;
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(Double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public Double getTotalRaised() {
        return totalRaised;
    }

    public void setTotalRaised(Double totalRaised) {
        this.totalRaised = totalRaised;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Long getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(Long organizationID) {
        this.organizationID = organizationID;
    }
}