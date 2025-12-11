# helpUp-system

## Recent Updates (December 2025)

### ✅ Dynamic Total Funds Raised Calculation (Latest)

Organization totalRaised is now calculated dynamically from all campaign totals, ensuring real-time accuracy without requiring separate database updates.

**What Changed:**
- Organization.totalRaised is no longer stored in the database
- Created OrganizationDTO that calculates totalRaised from campaign totals
- OrganizationService converts entities to DTOs with dynamic calculation
- DonationService simplified - only updates campaign totals, organization totals calculated automatically
- Frontend receives accurate totals from API in real-time

**How It Works:**
- User donates → Campaign.totalRaised updated
- Organization total = SUM of all its campaign totalRaised values
- Frontend fetches OrganizationDTO with calculated total
- No separate organization update needed

### ✅ Total Funds Raised Feature Complete

Both campaign and organization totalRaised values now correctly reflect all donations in real-time.

**Features:**
- Campaign donation progress bars update dynamically
- Organization totals calculated from campaign totals
- Real-time updates on every donation
- DataInitializer backfills historical campaign data on startup

### Previous Implementations

#### Donation Progress Bars ✅
- Campaign donation progress bars now update in real-time
- Frontend correctly displays total raised vs target amount
- Field naming fixed (targetAmount instead of goalAmount)

#### Database Schema ✅
- Campaign.totalRaised field added to persistence
- Automatic Hibernate schema updates enabled

---

For more information, see individual documentation files in this directory.