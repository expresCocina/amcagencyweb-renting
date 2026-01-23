-- Add tags column to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create index for faster tag searching
CREATE INDEX IF NOT EXISTS idx_tasks_tags ON tasks USING GIN (tags);

-- Comment on column
COMMENT ON COLUMN tasks.tags IS 'Array of text tags for categorizing tasks (e.g., "urgent", "billing")';
