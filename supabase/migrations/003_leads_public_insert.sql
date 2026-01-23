-- =====================================================
-- Allow public insert for leads table (contact form)
-- =====================================================

-- Enable RLS on leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert leads (from contact form)
CREATE POLICY "Allow public insert on leads"
ON leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view leads"
ON leads
FOR SELECT
TO authenticated
USING (true);

-- Policy: Allow authenticated users to update leads
CREATE POLICY "Allow authenticated users to update leads"
ON leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to delete leads
CREATE POLICY "Allow authenticated users to delete leads"
ON leads
FOR DELETE
TO authenticated
USING (true);
