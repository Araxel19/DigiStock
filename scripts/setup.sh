#!/bin/bash

# DigiStock Setup Script
# Este script automatiza la instalación completa del sistema

set -e

echo "🚀 Iniciando instalación de DigiStock..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar prerrequisitos
check_prerequisites() {
    print_status "Verificando prerrequisitos..."
    
    # Verificar Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker no está instalado. Por favor instala Docker primero."
        exit 1
    fi
    
    # Verificar Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
        exit 1
    fi
    
    # Verificar Node.js (opcional, para desarrollo)
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js encontrado: $NODE_VERSION"
    else
        print_warning "Node.js no encontrado. Recomendado para desarrollo local."
    fi
    
    print_success "Prerrequisitos verificados"
}

# Configurar variables de entorno
setup_environment() {
    print_status "Configurando variables de entorno..."
    
    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            print_success "Archivo .env creado desde .env.example"
        else
            print_error "Archivo .env.example no encontrado"
            exit 1
        fi
    else
        print_warning "Archivo .env ya existe, no se sobrescribirá"
    fi
    
    # Generar JWT secret si no existe
    if ! grep -q "JWT_SECRET=tu-clave-jwt" .env; then
        JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "digistock-jwt-secret-$(date +%s)")
        sed -i.bak "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
        print_success "JWT Secret generado"
    fi
    
    print_warning "IMPORTANTE: Configura las credenciales de Google Cloud en el archivo .env"
    print_warning "Variables requeridas:"
    echo "  - GOOGLE_CLOUD_PROJECT_ID"
    echo "  - GOOGLE_CLOUD_PRIVATE_KEY"
    echo "  - GOOGLE_CLOUD_CLIENT_EMAIL"
}

# Crear directorios necesarios
create_directories() {
    print_status "Creando directorios necesarios..."
    
    mkdir -p uploads/planillas
    mkdir -p logs
    mkdir -p backups
    
    # Permisos para uploads
    chmod 755 uploads
    chmod 755 uploads/planillas
    
    print_success "Directorios creados"
}

# Construir y levantar servicios
start_services() {
    print_status "Construyendo y levantando servicios..."
    
    # Construir imágenes
    docker-compose build --no-cache
    
    # Levantar servicios
    docker-compose up -d
    
    print_success "Servicios iniciados"
}

# Verificar servicios
verify_services() {
    print_status "Verificando servicios..."
    
    # Esperar a que los servicios estén listos
    sleep 10
    
    # Verificar PostgreSQL
    if docker-compose exec -T postgres pg_isready -U digistock_user > /dev/null 2>&1; then
        print_success "PostgreSQL está funcionando"
    else
        print_error "PostgreSQL no está respondiendo"
        return 1
    fi
    
    # Verificar Backend
    if curl -f http://localhost:3000/api/v1/auth/login > /dev/null 2>&1; then
        print_success "Backend API está funcionando"
    else
        print_warning "Backend API no está respondiendo (puede estar iniciando)"
    fi
    
    # Verificar Frontend
    if curl -f http://localhost:8080 > /dev/null 2>&1; then
        print_success "Frontend está funcionando"
    else
        print_warning "Frontend no está respondiendo (puede estar iniciando)"
    fi
    
    # Verificar n8n
    if curl -f http://localhost:5678 > /dev/null 2>&1; then
        print_success "n8n está funcionando"
    else
        print_warning "n8n no está respondiendo (puede estar iniciando)"
    fi
}

# Configurar n8n
setup_n8n() {
    print_status "Configurando n8n..."
    
    print_warning "Configuración manual requerida para n8n:"
    echo "1. Accede a http://localhost:5678"
    echo "2. Usuario: admin / Contraseña: admin123"
    echo "3. Importa los workflows desde la carpeta n8n_flows/"
    echo "4. Configura las variables de entorno en n8n:"
    echo "   - GOOGLE_CLOUD_API_KEY"
    echo "   - BACKEND_URL=http://backend:3000"
}

# Mostrar información final
show_final_info() {
    print_success "¡Instalación completada!"
    echo ""
    echo "🌐 URLs de acceso:"
    echo "  Frontend:  http://localhost:8080"
    echo "  Backend:   http://localhost:3000"
    echo "  n8n:       http://localhost:5678"
    echo "  API Docs:  http://localhost:3000/api/docs"
    echo ""
    echo "🔐 Credenciales por defecto:"
    echo "  DigiStock: admin@digistock.com / admin123"
    echo "  n8n:       admin / admin123"
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Configura las credenciales de Google Cloud en .env"
    echo "2. Reinicia los servicios: docker-compose restart"
    echo "3. Configura los workflows en n8n"
    echo "4. ¡Comienza a digitalizar inventarios!"
    echo ""
    echo "📚 Documentación:"
    echo "  Manual: docs/manual_instalacion.md"
    echo "  Arquitectura: docs/flujo_arquitectura.md"
}

# Función principal
main() {
    echo "╔══════════════════════════════════════╗"
    echo "║          DigiStock Setup             ║"
    echo "║   Sistema de Digitalización OCR      ║"
    echo "╚══════════════════════════════════════╝"
    echo ""
    
    check_prerequisites
    setup_environment
    create_directories
    start_services
    verify_services
    setup_n8n
    show_final_info
    
    print_success "Setup completado exitosamente! 🎉"
}

# Ejecutar función principal
main "$@"