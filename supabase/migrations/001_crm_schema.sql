-- =====================================================
-- CRM Database Schema for AMC Agency
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. LEADS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact Info
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT,
    empresa TEXT,
    
    -- Lead Details
    fuente TEXT DEFAULT 'web', -- web, referido, redes_sociales, llamada_fria, evento
    estado TEXT DEFAULT 'nuevo', -- nuevo, contactado, calificado, propuesta, ganado, perdido
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    valor_estimado DECIMAL(10, 2) DEFAULT 0,
    
    -- Assignment
    asignado_a UUID REFERENCES auth.users(id),
    
    -- Notes
    notas TEXT,
    razon_perdida TEXT, -- si estado = perdido
    
    -- Tracking
    ultima_actividad TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_conversion TIMESTAMP WITH TIME ZONE -- cuando se convierte en cliente
);

-- =====================================================
-- 2. DEALS TABLE (Oportunidades de Venta)
-- =====================================================
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Relations
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    cliente_id BIGINT REFERENCES clients(id) ON DELETE SET NULL, -- BIGINT para compatibilidad
    
    -- Deal Info
    titulo TEXT NOT NULL,
    descripcion TEXT,
    valor DECIMAL(10, 2) NOT NULL DEFAULT 0,
    
    -- Pipeline
    etapa TEXT DEFAULT 'prospecto', -- prospecto, propuesta, negociacion, cerrado_ganado, cerrado_perdido
    probabilidad INTEGER DEFAULT 10 CHECK (probabilidad >= 0 AND probabilidad <= 100),
    
    -- Dates
    fecha_estimada_cierre DATE,
    fecha_cierre_real DATE,
    
    -- Assignment
    asignado_a UUID REFERENCES auth.users(id),
    
    -- Notes
    notas TEXT,
    razon_perdida TEXT
);

-- =====================================================
-- 3. TASKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Task Info
    titulo TEXT NOT NULL,
    descripcion TEXT,
    tipo TEXT DEFAULT 'seguimiento', -- llamada, email, reunion, seguimiento, demo
    prioridad TEXT DEFAULT 'media', -- baja, media, alta, urgente
    estado TEXT DEFAULT 'pendiente', -- pendiente, en_progreso, completada, cancelada
    
    -- Dates
    fecha_vencimiento TIMESTAMP WITH TIME ZONE,
    completada_en TIMESTAMP WITH TIME ZONE,
    
    -- Assignment
    asignado_a UUID REFERENCES auth.users(id),
    creado_por UUID REFERENCES auth.users(id),
    
    -- Relations (polymorphic)
    relacionado_con TEXT, -- lead, deal, client, project
    relacionado_id TEXT, -- Cambiado a TEXT para soportar UUID y BIGINT
    
    -- Result
    resultado TEXT -- notas del resultado cuando se completa
);

-- =====================================================
-- 4. ACTIVITIES TABLE (Timeline/Historial)
-- =====================================================
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Activity Info
    tipo TEXT NOT NULL, -- email, llamada, nota, whatsapp, reunion, cambio_estado
    titulo TEXT,
    descripcion TEXT,
    
    -- Relations (polymorphic)
    relacionado_con TEXT NOT NULL, -- lead, deal, client, project, task
    relacionado_id TEXT NOT NULL, -- Cambiado a TEXT para soportar UUID y BIGINT
    
    -- User
    usuario_id UUID REFERENCES auth.users(id),
    
    -- Metadata (flexible JSON for extra data)
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- 5. PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Relations
    cliente_id BIGINT REFERENCES clients(id) ON DELETE CASCADE, -- BIGINT para compatibilidad
    deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
    
    -- Project Info
    nombre TEXT NOT NULL,
    descripcion TEXT,
    tipo_proyecto TEXT, -- web, ecommerce, marketing, branding, app_movil
    estado TEXT DEFAULT 'planificacion', -- planificacion, desarrollo, revision, completado, cancelado
    
    -- Dates
    fecha_inicio DATE,
    fecha_entrega_estimada DATE,
    fecha_entrega_real DATE,
    
    -- Financial
    valor_proyecto DECIMAL(10, 2) DEFAULT 0,
    
    -- Progress
    progreso INTEGER DEFAULT 0 CHECK (progreso >= 0 AND progreso <= 100),
    
    -- Assignment
    responsable UUID REFERENCES auth.users(id),
    
    -- Notes
    notas TEXT
);

-- =====================================================
-- 6. DOCUMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Document Info
    nombre TEXT NOT NULL,
    tipo TEXT, -- contrato, propuesta, factura, entregable, otro
    url TEXT NOT NULL, -- Supabase Storage URL
    tamano_bytes BIGINT,
    
    -- Relations (polymorphic)
    relacionado_con TEXT NOT NULL, -- lead, deal, client, project
    relacionado_id TEXT NOT NULL, -- Cambiado a TEXT para soportar UUID y BIGINT
    
    -- User
    subido_por UUID REFERENCES auth.users(id)
);

-- =====================================================
-- 7. USER PROFILES TABLE (Extended user info)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Profile Info
    nombre_completo TEXT,
    rol TEXT DEFAULT 'vendedor', -- admin, vendedor, soporte
    avatar_url TEXT,
    telefono TEXT,
    
    -- Settings
    activo BOOLEAN DEFAULT true,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

-- Leads
CREATE INDEX idx_leads_estado ON leads(estado);
CREATE INDEX idx_leads_asignado ON leads(asignado_a);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_ultima_actividad ON leads(ultima_actividad DESC);

-- Deals
CREATE INDEX idx_deals_etapa ON deals(etapa);
CREATE INDEX idx_deals_asignado ON deals(asignado_a);
CREATE INDEX idx_deals_lead ON deals(lead_id);
CREATE INDEX idx_deals_cliente ON deals(cliente_id);

-- Tasks
CREATE INDEX idx_tasks_estado ON tasks(estado);
CREATE INDEX idx_tasks_asignado ON tasks(asignado_a);
CREATE INDEX idx_tasks_vencimiento ON tasks(fecha_vencimiento);
CREATE INDEX idx_tasks_relacionado ON tasks(relacionado_con, relacionado_id);

-- Activities
CREATE INDEX idx_activities_relacionado ON activities(relacionado_con, relacionado_id);
CREATE INDEX idx_activities_usuario ON activities(usuario_id);
CREATE INDEX idx_activities_created ON activities(created_at DESC);

-- Projects
CREATE INDEX idx_projects_cliente ON projects(cliente_id);
CREATE INDEX idx_projects_estado ON projects(estado);
CREATE INDEX idx_projects_responsable ON projects(responsable);

-- Documents
CREATE INDEX idx_documents_relacionado ON documents(relacionado_con, relacionado_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- LEADS Policies
CREATE POLICY "Users can view all leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert leads" ON leads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update assigned leads" ON leads FOR UPDATE USING (asignado_a = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));
CREATE POLICY "Admins can delete leads" ON leads FOR DELETE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- DEALS Policies
CREATE POLICY "Users can view all deals" ON deals FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert deals" ON deals FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update assigned deals" ON deals FOR UPDATE USING (asignado_a = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));
CREATE POLICY "Admins can delete deals" ON deals FOR DELETE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- TASKS Policies
CREATE POLICY "Users can view all tasks" ON tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert tasks" ON tasks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update assigned tasks" ON tasks FOR UPDATE USING (asignado_a = auth.uid() OR creado_por = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));
CREATE POLICY "Users can delete own tasks" ON tasks FOR DELETE USING (creado_por = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- ACTIVITIES Policies (Read-only for most, admins can delete)
CREATE POLICY "Users can view all activities" ON activities FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert activities" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete activities" ON activities FOR DELETE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- PROJECTS Policies
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update assigned projects" ON projects FOR UPDATE USING (responsable = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));
CREATE POLICY "Admins can delete projects" ON projects FOR DELETE USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- DOCUMENTS Policies
CREATE POLICY "Users can view all documents" ON documents FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert documents" ON documents FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can delete own documents" ON documents FOR DELETE USING (subido_por = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- USER_PROFILES Policies
CREATE POLICY "Users can view all profiles" ON user_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admins can manage all profiles" ON user_profiles FOR ALL USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND rol = 'admin'));

-- =====================================================
-- TRIGGERS for updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample user profile (you'll need to replace with actual user ID from auth.users)
-- INSERT INTO user_profiles (id, nombre_completo, rol) VALUES 
-- ('your-user-id-here', 'Admin User', 'admin');

-- Sample lead
-- INSERT INTO leads (nombre, email, telefono, empresa, fuente, estado, valor_estimado) VALUES
-- ('Juan Pérez', 'juan@example.com', '3001234567', 'Empresa XYZ', 'web', 'nuevo', 5000000);
