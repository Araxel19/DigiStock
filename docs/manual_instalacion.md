# Manual de Instalación y Configuración - DigiStock

## 🎯 Arquitectura del Sistema

DigiStock utiliza una arquitectura distribuida donde:
- **Frontend (Vue.js)**: Maneja vistas, autenticación y comunicación con usuario
- **Backend (NestJS)**: API REST para autenticación y gestión de datos
- **n8n**: Motor principal de procesamiento OCR y flujos de trabajo
- **PostgreSQL**: Base de datos centralizada

## 📋 Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose
- Git
- Cuenta de Google Cloud (para Vision API)

## 🚀 Instalación Paso a Paso

### 1. Clonar y Configurar el Proyecto

```bash
# Clonar el repositorio
git clone <tu-repositorio> digistock
cd digistock

# Copiar archivo de configuración
cp .env.example .env
```

### 2. Configurar Variables de Entorno

Editar el archivo `.env`:

```bash
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=digistock_user
DB_PASSWORD=digistock_password_2024
DB_NAME=digistock_db

# JWT Configuration
JWT_SECRET=tu-clave-jwt-super-secreta-aqui-2024
JWT_EXPIRES_IN=7d

# Google Cloud Vision API (IMPORTANTE)
GOOGLE_CLOUD_PROJECT_ID=tu-proyecto-gcp
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_CLOUD_CLIENT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com

# n8n Configuration
N8N_HOST=n8n
N8N_PORT=5678
N8N_WEBHOOK_URL=http://n8n:5678/webhook

# Application Configuration
BACKEND_PORT=3000
FRONTEND_PORT=8080
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:8080
```

### 3. Configurar Google Cloud Vision API

1. **Crear proyecto en Google Cloud Console**
2. **Habilitar Vision API**
3. **Crear Service Account**:
   ```bash
   # En Google Cloud Console
   IAM & Admin > Service Accounts > Create Service Account
   # Asignar rol: Cloud Vision API Service Agent
   ```
4. **Generar clave JSON y extraer datos para .env**

### 4. Levantar los Servicios

```bash
# Construir y levantar todos los servicios
docker-compose up -d

# Verificar que todos los servicios estén corriendo
docker-compose ps
```

### 5. Verificar Instalación

```bash
# Backend API
curl http://localhost:3000/api/v1/auth/login

# Frontend
open http://localhost:8080

# n8n Interface
open http://localhost:5678
# Usuario: admin / Contraseña: admin123
```

## 🔧 Configuración de n8n

### 1. Acceder a n8n
- URL: http://localhost:5678
- Usuario: admin
- Contraseña: admin123

### 2. Importar Flujos Base

En n8n, importar los siguientes workflows:

#### A. Flujo Principal de OCR (`ocr_processing_workflow.json`)
```json
{
  "name": "DigiStock OCR Processing",
  "nodes": [
    {
      "parameters": {
        "path": "digistock-ocr",
        "options": {}
      },
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "parameters": {
        "url": "http://backend:3000/api/v1/inventory/notify-progress",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "planillaId",
              "value": "={{ $json.planillaId }}"
            },
            {
              "name": "status",
              "value": "processing"
            },
            {
              "name": "message",
              "value": "Iniciando procesamiento OCR..."
            }
          ]
        }
      },
      "name": "Notify Start",
      "type": "n8n-nodes-base.httpRequest"
    }
  ]
}
```

### 3. Configurar Webhooks

Los webhooks principales que necesitas configurar:

1. **OCR Processing**: `http://localhost:5678/webhook/digistock-ocr`
2. **Progress Updates**: `http://localhost:5678/webhook/digistock-progress`

## 🎯 Flujo de Trabajo Completo

### Paso 1: Usuario Sube Planilla
```
Frontend → Backend → Guarda archivo → Llama webhook n8n
```

### Paso 2: n8n Procesa OCR
```
n8n recibe → Notifica inicio → Procesa con Google Vision → Extrae datos
```

### Paso 3: Actualizaciones en Tiempo Real
```
n8n → Envía progreso → Backend → WebSocket → Frontend actualiza UI
```

### Paso 4: Finalización
```
n8n → Guarda en BD → Notifica completado → Frontend muestra resultados
```

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar un servicio específico
docker-compose restart backend

# Acceder a la base de datos
docker-compose exec postgres psql -U digistock_user -d digistock_db

# Backup de la base de datos
docker-compose exec postgres pg_dump -U digistock_user digistock_db > backup.sql
```

### Producción
```bash
# Levantar en modo producción
docker-compose -f docker-compose.prod.yml up -d

# Actualizar código sin downtime
docker-compose pull
docker-compose up -d --no-deps backend frontend
```

## 🔍 Troubleshooting

### Problema: n8n no puede conectar con backend
```bash
# Verificar red de Docker
docker network ls
docker network inspect digistock_digistock_network
```

### Problema: OCR no funciona
```bash
# Verificar configuración de Google Cloud
docker-compose exec backend node -e "console.log(process.env.GOOGLE_CLOUD_PROJECT_ID)"
```

### Problema: Frontend no carga
```bash
# Verificar logs del frontend
docker-compose logs frontend

# Reconstruir frontend
docker-compose build frontend
docker-compose up -d frontend
```

## 📊 Monitoreo

### Métricas Importantes
- Tiempo de procesamiento OCR
- Tasa de éxito de extracción
- Número de planillas procesadas por día
- Errores en flujos n8n

### Logs a Monitorear
```bash
# Logs de n8n
docker-compose logs n8n | grep ERROR

# Logs de backend
docker-compose logs backend | grep "OCR"

# Logs de base de datos
docker-compose logs postgres | grep ERROR
```

## 🔐 Seguridad

### Configuraciones Importantes
1. Cambiar contraseñas por defecto
2. Configurar HTTPS en producción
3. Restringir acceso a n8n
4. Rotar claves JWT regularmente

### Backup y Recuperación
```bash
# Backup completo
./scripts/backup.sh

# Restaurar backup
./scripts/restore.sh backup_2024_01_15.tar.gz
```

## 📞 Soporte

Para soporte técnico:
1. Revisar logs con los comandos anteriores
2. Verificar configuración de variables de entorno
3. Comprobar conectividad entre servicios
4. Consultar documentación de n8n y Google Cloud Vision

---

**¡Tu sistema DigiStock está listo para digitalizar inventarios! 🚀**