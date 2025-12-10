-- Increase the size of the description column in the campaign table
-- This fixes the "Data too long for column 'description'" error

ALTER TABLE campaign MODIFY COLUMN description VARCHAR(2000);
