# Featured Donations Implementation - Testing Guide

## Overview
This guide documents the implementation of dynamic Featured Donations sections on both the Landing Page and Donor Home Page. The sections now correctly fetch and display all donation drives created by the organization from the backend API.

## Changes Made

### 1. New Custom Hook: `useCampaigns.js`
**Location**: `frontend/src/hooks/useCampaigns.js`

**Features**:
- Fetches all campaigns from `/api/campaigns` endpoint
- Provides loading, error, and data states
- Includes utility function `transformCampaignForCard()` to format campaign data for DonationCard component
- Intelligent image selection based on campaign content
- Automatic error handling and retry functionality

### 2. Updated Landing Page (`Landingpage.jsx`)
**Changes**:
- Added campaign fetching using `useCampaigns` hook
- Replaced hardcoded donation cards with dynamic campaigns
- Added loading skeletons for better UX
- Added error handling with retry functionality
- Displays real campaigns in both hero section and support section
- Shows appropriate fallback when no campaigns are available

### 3. Updated Homepage (`Homepage.jsx`)
**Changes**:
- Added campaign fetching using `useCampaigns` hook
- Replaced hardcoded featured drives with dynamic campaigns
- Added loading skeletons for better UX
- Added error handling with retry functionality
- Displays up to 3 real campaigns in the Featured Donation Drives section

## Testing Instructions

### Backend Setup
1. Ensure MySQL server is running on localhost:3306
2. Create database: `CREATE DATABASE HelpUp;`
3. Start the backend server:
   ```bash
   cd helpUp-system/backend/helpup
   mvn spring-boot:run
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd helpUp-system/frontend
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm start
   ```

### Test Data Setup
To test with real data, create organizations and campaigns via:
1. Register an organization through the application
2. Create campaigns via the organization dashboard
3. Or directly insert test data into the database

### Expected Behavior

#### Landing Page
- **Hero Section**: Shows up to 5 campaigns
- **Support Section**: Shows up to 6 campaigns
- **Loading State**: Skeleton cards with animated placeholders
- **Error State**: Error message with retry button
- **No Data State**: Fallback cards indicating no active campaigns

#### Homepage (Donor Home Page)
- **Featured Drives Section**: Shows up to 3 campaigns
- **Loading State**: Skeleton cards with animated placeholders
- **Error State**: Error message with retry button
- **No Data State**: Fallback cards indicating no active campaigns

### API Endpoints Used
- `GET /api/campaigns` - Fetch all campaigns
- Campaign data structure includes:
  - `campaignID`: Unique identifier
  - `name`: Campaign name
  - `description`: Campaign description
  - `targetAmount`: Target donation amount
  - `startDate`: Campaign start date
  - `endDate`: Campaign end date
  - `organization`: Organization object with `organizationID` and `name`

### Image Selection Logic
The system automatically selects appropriate images based on campaign content:
- Campaigns with "fire" keywords → `/images/fireimage.jpg`
- Campaigns with "flood/water/typhoon" keywords → `/images/fire_img2.JPG.jpg`
- Campaigns with "storm/bagyo" keywords → `/images/bagyo_tino1.jpg`
- Campaigns with "community/support" keywords → `/images/bagyo_tino2.jpg`
- Default fallback → `/images/fireimage.jpg`

## Verification Steps

1. **Test Landing Page**:
   - Navigate to the home page
   - Verify campaigns load in hero section (5 cards)
   - Scroll to support section and verify campaigns load (6 cards)
   - Check loading states during data fetch
   - Verify error handling if backend is unavailable

2. **Test Homepage**:
   - Log in as a donor
   - Navigate to homepage/dashboard
   - Verify campaigns load in Featured Drives section (3 cards)
   - Check loading and error states

3. **Test with No Data**:
   - Clear campaign data from database
   - Verify fallback messages appear
   - Ensure UI remains functional

4. **Test with Error States**:
   - Stop backend server
   - Verify error messages appear with retry functionality
   - Restart backend and verify data loads correctly

## Performance Considerations
- Campaigns are fetched once per page load
- Loading skeletons provide immediate visual feedback
- Error states prevent infinite loading
- Fallback images ensure consistent UI
- Efficient data transformation for DonationCard compatibility

## Browser Compatibility
- Compatible with all modern browsers
- Responsive design maintained
- Loading animations use CSS animations for smooth experience

## Future Enhancements
- Add campaign filtering and search
- Implement pagination for large campaign lists
- Add campaign detail modal navigation
- Implement campaign status filtering (active, ended, upcoming)
- Add real-time campaign updates via WebSocket