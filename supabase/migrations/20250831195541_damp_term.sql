-- DigiStock Database Schema
-- PostgreSQL initialization script

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0,
    stock INTEGER DEFAULT 0,
    category VARCHAR(100),
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Planillas table
CREATE TABLE IF NOT EXISTS planillas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'error')),
    ocr_data JSONB,
    extracted_products JSONB,
    error_message TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_code ON products(code);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_planillas_status ON planillas(status);
CREATE INDEX IF NOT EXISTS idx_planillas_created_at ON planillas(created_at);

-- Insert default admin user
INSERT INTO users (email, password, first_name, last_name, role) 
VALUES (
    'admin@digistock.com', 
    '$2y$10$S85xnIGANyXDx74uAgTO7OTJrh5YtPaHnyb9PFzY2MDWMek8Cz1DW', -- password: admin123
    'Administrador',
    'Sistema',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Sample products for testing
INSERT INTO products (code, name, description, price, stock, category, location) VALUES
('PROD001', 'Laptop Dell Inspiron', 'Laptop 15 pulgadas, 8GB RAM, 256GB SSD', 15999.99, 5, 'Electrónicos', 'Almacén A - Estante 1'),
('PROD002', 'Mouse Logitech', 'Mouse inalámbrico ergonómico', 299.99, 25, 'Accesorios', 'Almacén A - Estante 2'),
('PROD003', 'Teclado Mecánico', 'Teclado mecánico RGB retroiluminado', 1299.99, 15, 'Accesorios', 'Almacén A - Estante 2')
ON CONFLICT (code) DO NOTHING;