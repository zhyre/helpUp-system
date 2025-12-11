# Total Funds Raised Update - Implementation Guide

## Summary of Changes

The following changes have been made to ensure that both campaign and organization totalRaised values are correctly updated and reflected in real-time:

### Backend Changes

#### 1. **Organization Entity** (`Organization.java`)
- Added `totalRaised` field with database column mapping
- Added getter and setter methods for `totalRaised`

#### 2. **DonationService** (`DonationService.java`)
- Now updates both campaign AND organization totalRaised when a donation is processed
- Automatically increments organization total whenever a campaign receives a donation

#### 3. **DataInitializer** (NEW - `DataInitializer.java`)
- Runs automatically on application startup
- Calculates and backfills existing campaign and organization totalRaised values from completed donations
- Ensures historical data is properly initialized

#### 4. **Database Migration Script** (Optional - `schema-updates.sql`)
- Provided for manual schema updates if needed
- Adds `total_raised` column to both `organization` and `campaign` tables

### Frontend Changes

#### 1. **OrganizationPageDonor.jsx**
- Updated to use organization's `totalRaised` from API directly
- Removed manual calculation from campaigns

#### 2. **GlobalOrganizationPage.jsx**
- Updated to use organization's `totalRaised` from API directly
- Removed manual calculation from campaigns for each organization

## How It Works

### Donation Flow

1. **User makes a donation** → Donation amount is deducted from wallet
2. **Campaign totalRaised updated** → Campaign.totalRaised incremented
3. **Organization totalRaised updated** (NEW) → Organization.totalRaised incremented
4. **Changes persisted to database** → Both entities saved
5. **Frontend updated** → React components display updated values

### Data Initialization

On application startup:
1. DataInitializer bean is loaded
2. All campaigns are scanned for completed donations
3. Campaign totalRaised is calculated and populated if currently 0
4. All organizations are scanned for donations in their campaigns
5. Organization totalRaised is calculated and populated if currently 0

## Steps to Activate

### Step 1: Stop the Running Application
Stop your Spring Boot backend application if it's currently running.

### Step 2: Deploy Latest Code
Ensure the backend JAR file is rebuilt with all the latest changes:
```bash
cd backend/helpup
./mvnw.cmd clean package -DskipTests
```

### Step 3: Restart the Application
Start the Spring Boot application. During startup:
- Hibernate will create the `total_raised` column in both `organization` and `campaign` tables (if using `ddl-auto=update`)
- DataInitializer will run and populate totalRaised values from existing donations

### Step 4: Verify in Logs
Look for these messages in the console:
```
Campaign totals initialized!
Organization totals initialized!
Data initialization completed successfully!
```

### Step 5: Test the Functionality
1. Navigate to the Global Organizations page
2. Verify that the "Total Funds Raised" value is now showing actual amounts
3. Navigate to an individual organization page
4. Verify that "Total Raised" value is correctly displayed
5. Make a test donation
6. Verify that both campaign and organization totals update immediately

## Database Schema

### Campaign Table
```sql
ALTER TABLE campaign ADD COLUMN IF NOT EXISTS total_raised DOUBLE DEFAULT 0;
```

### Organization Table
```sql
ALTER TABLE organization ADD COLUMN IF NOT EXISTS total_raised DOUBLE DEFAULT 0;
```

## API Response Structure

The organization API now returns:
```json
{
  "organizationID": 1,
  "name": "Organization Name",
  "description": "Description",
  "address": "Address",
  "contactDetails": "Contact info",
  "eligibilityProof": "Proof",
  "approvalStatus": "approved",
  "totalRaised": 50000.00
}
```

The campaign API returns:
```json
{
  "campaignID": 1,
  "name": "Campaign Name",
  "targetAmount": 100000.00,
  "totalRaised": 50000.00,
  ...
}
```

## Troubleshooting

### Issue: Total Funds Raised still shows 0
**Solution:**
1. Ensure the application has been restarted after deploying new code
2. Check the application logs for "Data initialization completed successfully!" message
3. Verify that donations exist in the database with status = 'completed'
4. Manually run the initialization SQL if needed

### Issue: Database errors about missing columns
**Solution:**
1. Ensure `spring.jpa.hibernate.ddl-auto=update` is set in `application.properties`
2. Restart the application to allow Hibernate to create the schema
3. Alternatively, manually execute the SQL from `schema-updates.sql`

### Issue: Frontend still showing old values
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart the development frontend server
3. Verify the backend API is returning the updated values by checking network tab in browser DevTools

## Performance Notes

- The DataInitializer runs in a single transaction for all campaigns and organizations
- It only processes empty totalRaised values (0 or null)
- For large databases with many donations, initial startup may take a few seconds longer
- Subsequent donations are updated in real-time with minimal performance impact

## Files Modified

### Backend
- `src/main/java/com/helpup/entity/Organization.java`
- `src/main/java/com/helpup/service/DonationService.java`
- `src/main/java/com/helpup/config/DataInitializer.java` (NEW)
- `src/main/resources/schema-updates.sql` (NEW - optional)

### Frontend
- `src/GlobalOrganizationPage/OrganizationPageDonor.jsx`
- `src/GlobalOrganizationPage/GlobalOrganizationPage.jsx`

## Build Status

✅ Backend: Successfully compiled (29 source files)
✅ Frontend: Successfully built (no critical errors)
