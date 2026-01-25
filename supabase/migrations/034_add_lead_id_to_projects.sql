-- Add lead_id column to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE SET NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_projects_lead ON projects(lead_id);
