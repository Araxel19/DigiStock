-- DigiStock Final SaaS Database Schema (v4.0)
-- Architecture designed for a multi-tenant SaaS application.
-- Incorporates Super Admin level, Organization-level RBAC, and full audit/tracking capabilities as per IEEE830 specification.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core Tables (Organizations, Users, Roles) --
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL -- 'org_admin', 'supervisor', 'data_entry'
);

-- users Table --- MODIFICADO ---
-- Se añade el flag 'is_super_admin' y se permite que 'organization_id' sea NULL.
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id), -- NULABLE para Super Admins
    is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,     -- Identifica al administrador global del SaaS
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);


-- Product & Inventory Structure --
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    UNIQUE (organization_id, name)
);

CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    UNIQUE (organization_id, name)
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) DEFAULT 0,
    cantidad INTEGER DEFAULT 0,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    UNIQUE (organization_id, code)
);


-- Planilla Processing Workflow Tables --
CREATE TABLE IF NOT EXISTS planillas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    status VARCHAR(30) DEFAULT 'recibido' CHECK (status IN ('recibido', 'en_ocr', 'validacion_pendiente', 'procesado', 'error')),
    raw_ocr_data JSONB,
    error_message TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processing_started_at TIMESTAMP WITH TIME ZONE,
    validated_by_user_id UUID REFERENCES users(id),
    validated_at TIMESTAMP WITH TIME ZONE,
    processed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS planilla_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    planilla_id UUID NOT NULL REFERENCES planillas(id) ON DELETE CASCADE,
    detected_code VARCHAR(100),
    detected_name VARCHAR(255),
    detected_quantity INTEGER,
    corrected_product_id UUID REFERENCES products(id),
    corrected_quantity INTEGER,
    match_status VARCHAR(50) DEFAULT 'unmatched' CHECK (match_status IN ('matched', 'unmatched', 'manual_override', 'ambiguous')),
    confidence_score REAL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Analytics, Reporting & Auditing Tables --
CREATE TABLE IF NOT EXISTS inventory_snapshots (
    id BIGSERIAL PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id),
    planilla_id UUID NOT NULL REFERENCES planillas(id),
    stock_quantity INTEGER NOT NULL,
    snapshot_date TIMESTAMP WITH TIME ZONE NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    generated_by_user_id UUID NOT NULL REFERENCES users(id),
    report_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    user_id UUID NOT NULL REFERENCES users(id),
    planilla_id UUID REFERENCES planillas(id),
    alert_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(100),
    target_record_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Indexes for performance --
CREATE INDEX IF NOT EXISTS idx_users_org_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_is_super_admin ON users(is_super_admin);
CREATE INDEX IF NOT EXISTS idx_products_org_id_code ON products(organization_id, code);
CREATE INDEX IF NOT EXISTS idx_planillas_user_id ON planillas(user_id);
CREATE INDEX IF NOT EXISTS idx_planillas_status ON planillas(status);
CREATE INDEX IF NOT EXISTS idx_snapshots_product_date ON inventory_snapshots(product_id, snapshot_date);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id_is_read ON alerts(user_id, is_read);


-- Default Data Seeding --

-- Roles --- MODIFICADO ---
-- Roles ahora definen la jerarquía DENTRO de una organización.
INSERT INTO roles (name) VALUES ('org_admin'), ('supervisor'), ('data_entry')
ON CONFLICT (name) DO NOTHING;


-- Default User Insertion --- MODIFICADO ---
-- Se crea el primer y único SUPER ADMIN del sistema.
DO $$
BEGIN
    -- Se crea el Super Admin global, sin organización y con el flag is_super_admin = TRUE.
    INSERT INTO users (organization_id, is_super_admin, email, password, first_name, last_name)
    VALUES (
        NULL,
        TRUE,
        'superadmin@digistock.com',
        '$2y$10$S85xnIGANyXDx74uAgTO7OTJrh5YtPaHnyb9PFzY2MDWMek8Cz1DW', -- password: admin123
        'Super',
        'Administrador'
    )
    ON CONFLICT (email) DO NOTHING;

END $$;