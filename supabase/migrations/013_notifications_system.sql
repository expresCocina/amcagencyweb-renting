-- =====================================================
-- 8. NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Recipient
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Content
    type TEXT DEFAULT 'info', -- info, success, warning, error
    title TEXT NOT NULL,
    message TEXT,
    link TEXT, -- URL internal path to redirect
    
    -- Status
    read BOOLEAN DEFAULT false,
    email_sent BOOLEAN DEFAULT false,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for performance
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- RLS Policies
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" 
    ON notifications FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
    ON notifications FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" 
    ON notifications FOR INSERT 
    WITH CHECK (true); -- Allow inserts from server-side or triggers

-- Trigger for Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
