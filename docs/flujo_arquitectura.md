# Flujo de Arquitectura DigiStock

## 🎯 Visión General del Flujo

DigiStock implementa una arquitectura distribuida donde **n8n actúa como el motor principal** de procesamiento, mientras que el frontend y backend manejan la interfaz de usuario y la persistencia de datos.

## 🔄 Flujo Completo Paso a Paso

### 1. Inicio del Proceso (Frontend)
```
Usuario selecciona imagen → Frontend valida archivo → Muestra preview
```

**Componentes involucrados:**
- `UploadPlanilla.vue`: Interfaz de carga
- Validación de tipo y tamaño de archivo
- Generación de preview

### 2. Envío a n8n (Frontend → n8n)
```
Usuario hace clic "Procesar" → Frontend envía a webhook n8n → n8n recibe trigger
```

**Datos enviados:**
```json
{
  "planillaId": "uuid-generado",
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQ...",
  "fileName": "planilla_inventario.jpg",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Webhook URL:** `http://localhost:5678/webhook/digistock-ocr`

### 3. Procesamiento en n8n

#### Paso 3.1: Notificación de Inicio
```
n8n → POST /api/v1/inventory/notify-progress
```
```json
{
  "planillaId": "uuid",
  "status": "processing",
  "message": "Iniciando procesamiento OCR..."
}
```

#### Paso 3.2: Llamada a Google Vision API
```
n8n → Google Cloud Vision API → Extracción de texto
```

#### Paso 3.3: Notificación de Progreso OCR
```
n8n → POST /api/v1/inventory/notify-progress
```
```json
{
  "planillaId": "uuid",
  "status": "processing", 
  "message": "Extrayendo texto de la imagen..."
}
```

#### Paso 3.4: Procesamiento y Estructuración
```javascript
// Código JavaScript en n8n para parsear productos
const extractedText = ocrResponse.responses[0]?.textAnnotations[0]?.description;
const products = parseProductsFromText(extractedText);
```

#### Paso 3.5: Notificación de Estructuración
```
n8n → POST /api/v1/inventory/notify-progress
```
```json
{
  "planillaId": "uuid",
  "status": "processing",
  "message": "Estructurando datos de productos..."
}
```

#### Paso 3.6: Guardado en Base de Datos
```
n8n → PUT /api/v1/inventory/planillas/{id}
```
```json
{
  "ocrData": { "rawText": "...", "confidence": 0.95 },
  "extractedProducts": [
    {
      "code": "PROD001",
      "name": "Laptop Dell",
      "quantity": 5,
      "price": 15999.99
    }
  ],
  "status": "processed"
}
```

#### Paso 3.7: Notificación de Finalización
```
n8n → POST /api/v1/inventory/notify-progress
```
```json
{
  "planillaId": "uuid",
  "status": "completed",
  "message": "Procesamiento completado. 15 productos encontrados."
}
```

### 4. Actualización en Tiempo Real (Backend → Frontend)

El backend recibe las notificaciones de progreso y las envía al frontend via WebSocket:

```javascript
// Backend WebSocket
websocket.send(JSON.stringify({
  type: 'progress',
  planillaId: 'uuid',
  status: 'processing',
  title: 'Extrayendo texto...',
  description: 'Procesando imagen con Google Vision API',
  timestamp: new Date().toISOString()
}));
```

### 5. Visualización de Resultados (Frontend)

El frontend recibe los datos procesados y muestra:
- Tabla editable con productos extraídos
- Opciones para corregir/agregar productos
- Botón para guardar en inventario

## 🛠️ Configuración de Webhooks n8n

### Webhook Principal
- **URL**: `http://localhost:5678/webhook/digistock-ocr`
- **Método**: POST
- **Datos esperados**:
  ```json
  {
    "planillaId": "string",
    "imageBase64": "string",
    "fileName": "string"
  }
  ```

### Endpoints de Notificación
- **Progress**: `POST /api/v1/inventory/notify-progress`
- **Update Planilla**: `PUT /api/v1/inventory/planillas/{id}`

## 🔧 Variables de Entorno n8n

```bash
# En n8n, configurar estas variables:
GOOGLE_CLOUD_API_KEY=tu-api-key-aqui
BACKEND_URL=http://backend:3000
DIGISTOCK_API_TOKEN=token-para-autenticacion
```

## 📊 Monitoreo del Flujo

### Logs Importantes
```bash
# Ver logs de n8n
docker-compose logs n8n | grep "digistock"

# Ver logs de backend
docker-compose logs backend | grep "notify-progress"

# Ver logs de frontend (en navegador)
console.log("WebSocket message:", data)
```

### Métricas a Monitorear
- Tiempo total de procesamiento
- Tasa de éxito de OCR
- Número de productos extraídos por planilla
- Errores en el flujo

## 🚨 Manejo de Errores

### Error en Google Vision API
```javascript
// En n8n, nodo de manejo de errores
if (ocrResponse.error) {
  // Notificar error al backend
  await $http.post('http://backend:3000/api/v1/inventory/notify-progress', {
    planillaId: planillaId,
    status: 'error',
    message: `Error en OCR: ${ocrResponse.error.message}`
  });
}
```

### Error en Parsing
```javascript
// Validación de productos extraídos
if (products.length === 0) {
  await $http.post('http://backend:3000/api/v1/inventory/notify-progress', {
    planillaId: planillaId,
    status: 'error', 
    message: 'No se pudieron extraer productos de la imagen'
  });
}
```

## 🔄 Flujo de Retry

En caso de errores, n8n puede implementar reintentos:

```json
{
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 5000
}
```

## 📈 Optimizaciones

### Procesamiento Asíncrono
- n8n maneja el procesamiento pesado
- Frontend no se bloquea
- Usuario recibe feedback en tiempo real

### Escalabilidad
- n8n puede procesar múltiples planillas en paralelo
- Base de datos centralizada
- Microservicios independientes

---

**Este flujo garantiza una experiencia de usuario fluida mientras mantiene la robustez del procesamiento OCR en segundo plano.**