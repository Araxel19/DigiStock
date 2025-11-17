# n8n Webhook Configuration: Dual Base URLs (Docker + Localhost)

## 📋 Resumen de Cambios

El sistema ahora soporta **ambas rutas base simultáneamente** en la red interna de Docker:

### Rutas Soportadas:
- **Docker (red interna)**: `http://n8n:5678/webhook/ocr-process` (Prod) y `http://n8n:5678/webhook-test/ocr-process` (Test)
- **Localhost (acceso directo)**: `http://localhost:5678/webhook/ocr-process` (Prod) y `http://localhost:5678/webhook-test/ocr-process` (Test)

**Estrategia de fallback**: Si `N8N_WEBHOOK_URL=http://n8n:5678`, el código intenta:
1. `http://n8n:5678/webhook/ocr-process` (Prod - Docker)
2. `http://localhost:5678/webhook/ocr-process` (Prod - Localhost)
3. `http://n8n:5678/webhook-test/ocr-process` (Test - Docker)
4. `http://localhost:5678/webhook-test/ocr-process` (Test - Localhost)

Si la URL primaria es `localhost:5678`, invierte el orden (localhost primero, n8n como fallback).

---

## 🔧 Cambios Realizados

### 1. **Backend Configuration** (`backend/src/config/n8n.config.ts`)
```typescript
getWebhookBaseUrls(): string[]  // Devuelve [primary, fallback]
```

### 2. **Adapter** (`backend/src/adapters/n8n.config.adapter.ts`)
```typescript
getBaseProdUrls(): string[]        // ['http://n8n:5678', 'http://localhost:5678']
getOcrProdWebhookUrls(): string[]  // URLs completas para prod
getOcrTestWebhookUrls(): string[]  // URLs completas para test
```

### 3. **OCR Service** (`business-logic/src/services/ocr.service.ts`)
- `processImage()` intenta **todas las URLs de prod** en orden
- Si todas fallan, intenta **todas las URLs de test** en orden
- Logs detallados para cada intento (✅ éxito o ⚠️ fallo)

---

## 🏗️ Arquitectura de Fallback

```
N8N_WEBHOOK_URL=http://n8n:5678  (por defecto)
    ↓
getBaseProdUrls() devuelve:
    [
      'http://n8n:5678',       ← Primaria (Docker)
      'http://localhost:5678'  ← Fallback (Localhost)
    ]
    ↓
Rutas de Prod:
    • http://n8n:5678/webhook/ocr-process
    • http://localhost:5678/webhook/ocr-process
    ↓
Rutas de Test (si prod falla):
    • http://n8n:5678/webhook-test/ocr-process
    • http://localhost:5678/webhook-test/ocr-process
```

---

## 🚀 Cómo Desplegar

### Desarrollo/Test (Docker Compose local):
```bash
cd c:\Users\Axel-\Documentos\Proyectos\DigiStock
docker-compose down
docker-compose up -d --build
```

El backend intentará automáticamente en este orden:
1. `http://n8n:5678/webhook/ocr-process`
2. `http://localhost:5678/webhook/ocr-process`
3. `http://n8n:5678/webhook-test/ocr-process`
4. `http://localhost:5678/webhook-test/ocr-process`

### Producción (Docker Stack):
```bash
# En `.env` o variables de stack, N8N_WEBHOOK_URL será:
N8N_WEBHOOK_URL=http://n8n:5678

docker stack deploy -c docker-stack.yml digistock
```

### Usando `localhost` como primaria:
Si prefieres que `localhost` sea la ruta primaria:
```bash
# En `.env` o docker-compose.yml:
N8N_WEBHOOK_URL=http://localhost:5678
```

Entonces intentará:
1. `http://localhost:5678/webhook/ocr-process`
2. `http://n8n:5678/webhook/ocr-process`
3. `http://localhost:5678/webhook-test/ocr-process`
4. `http://n8n:5678/webhook-test/ocr-process`

---

## ✅ Validación

### 1. **Ver logs del backend**
```powershell
docker-compose logs backend -f
```

Verás algo como:
```
Intentando enviar a n8n (prod): http://n8n:5678/webhook/ocr-process
✅ Éxito en: http://n8n:5678/webhook/ocr-process
```

O si falla la primera:
```
Intentando enviar a n8n (prod): http://n8n:5678/webhook/ocr-process
⚠️  Fallo en ruta prod (http://n8n:5678/webhook/ocr-process): connect ECONNREFUSED
Intentando enviar a n8n (prod): http://localhost:5678/webhook/ocr-process
✅ Éxito en: http://localhost:5678/webhook/ocr-process
```

### 2. **Probar manualmente con curl**

```powershell
# Test ruta Docker PRODUCCIÓN
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"imageBase64":"iVBORw0KGgo...", "planillaId":"123"}' `
  http://localhost:5678/webhook/ocr-process

# Test ruta localhost PRODUCCIÓN
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"imageBase64":"iVBORw0KGgo...", "planillaId":"123"}' `
  http://localhost:5678/webhook/ocr-process

# Test ruta Docker TEST
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"imageBase64":"iVBORw0KGgo...", "planillaId":"123"}' `
  http://localhost:5678/webhook-test/ocr-process
```

### 3. **Verificar conectividad**
```bash
# Desde dentro del contenedor backend
docker-compose exec backend curl -v http://n8n:5678/health

# Desde el host local
curl -v http://localhost:5678/health
```

---

## 📝 Para Pasar a Producción

Si deseas cambiar la URL de n8n en producción (ej: dominio externo):

### Opción 1: Mantener ambas (recomendado)
```env
# .env o Stack variables
N8N_WEBHOOK_URL=https://n8n.tu-dominio-prod.com
```

El código automáticamente soportará:
- Primaria: `https://n8n.tu-dominio-prod.com/webhook/ocr-process`
- Fallback: `http://n8n:5678/webhook/ocr-process` (no, porque no incluye `n8n:5678` ni `localhost`)

**Nota**: Si usas dominio externo, solo intentará esa URL. Para fallback automático, mantén el formato `http://n8n:5678` o `http://localhost:5678`.

### Opción 2: URL externa con fallback local
```env
N8N_WEBHOOK_URL=https://n8n.tu-dominio-prod.com
```
Luego en la app, edita manualmente `getBaseProdUrls()` en `n8n.config.ts` para añadir fallback:
```typescript
getWebhookBaseUrls(): string[] {
  const primary = this.getConfig().webhookBaseUrl;
  return [
    primary,
    'http://n8n:5678',  // Fallback local
  ];
}
```

---

## 🔗 Referencia de Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `backend/src/config/n8n.config.ts` | Añadido `getWebhookBaseUrls()` |
| `backend/src/adapters/n8n.config.adapter.ts` | Métodos para devolver listas de URLs (prod/test) |
| `business-logic/src/services/ocr.service.ts` | `processImage()` intenta todas las URLs en secuencia; interfaz actualizada |
| `.env`, `env.example`, `docker-compose.yml`, `docker-stack.yml` | `N8N_WEBHOOK_URL=http://n8n:5678` (sin suffix) |

---

## 📚 Notas Adicionales

- **Timeout**: Axios timeout = 60 segundos por request
- **Logs**: Cada intento se registra (éxito ✅ o fallo ⚠️)
- **Orden de intentos**:
  1. Todas las rutas de **PRODUCCIÓN** en orden
  2. Todas las rutas de **TEST** en orden (fallback)
  3. Si todas fallan, error con lista de URLs intentadas
- **Autenticación n8n**: Si n8n requiere auth, edita `ocr.service.ts` para añadir headers `Authorization`
