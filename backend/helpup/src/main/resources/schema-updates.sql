-- Add totalRaised column to organization table if it doesn't exist
ALTER TABLE organization ADD COLUMN IF NOT EXISTS total_raised DOUBLE DEFAULT 0;

-- Add totalRaised column to campaign table if it doesn't exist  
ALTER TABLE campaign ADD COLUMN IF NOT EXISTS total_raised DOUBLE DEFAULT 0;

-- Update existing campaigns with their totalRaised based on donations
UPDATE campaign c 
SET total_raised = COALESCE((
    SELECT SUM(d.amount) 
    FROM donation d 
    WHERE d.campaignID = c.campaignID 
    AND d.status = 'completed'
), 0)
WHERE total_raised = 0 AND c.campaignID IN (SELECT DISTINCT campaignID FROM donation);

-- Update existing organizations with their totalRaised based on donations from their campaigns
UPDATE organization o 
SET total_raised = COALESCE((
    SELECT SUM(d.amount) 
    FROM donation d 
    INNER JOIN campaign c ON d.campaignID = c.campaignID 
    WHERE c.organizationID = o.organizationID 
    AND d.status = 'completed'
), 0)
WHERE total_raised = 0 AND o.organizationID IN (SELECT DISTINCT c.organizationID FROM campaign c INNER JOIN donation d ON c.campaignID = d.campaignID);
