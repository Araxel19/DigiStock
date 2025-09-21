# -------- STAGE 1: Build business-logic --------
    FROM node:18-alpine AS business-logic-build

    WORKDIR /app/business-logic
    
    # Copiamos e instalamos dependencias (incluye dev porque necesitamos compilar)
    COPY business-logic/package*.json ./
    RUN npm install
    
    # Copiamos el código y compilamos
    COPY business-logic/ ./
    RUN npm run build
    
    
    
    # -------- STAGE 2: Build backend --------
    FROM node:18-alpine AS backend-build
    
    WORKDIR /app/backend
    
    # Instalar dependencias del backend
    COPY backend/package*.json ./
    RUN npm install
    
    # Copiar código del backend
    COPY backend/ ./
    
    # Copiar dist y package.json del business-logic como si fuera un módulo npm
    COPY --from=business-logic-build /app/business-logic/dist ../node_modules/digistock-business-logic/dist
    COPY --from=business-logic-build /app/business-logic/package.json ../node_modules/digistock-business-logic/
    
    # Instalar dependencias del business-logic dentro del backend
    RUN cd ../node_modules/digistock-business-logic && npm install --omit=dev
    
    # Compilar backend
    RUN npm run build
    
    
    
    # -------- STAGE 3: Runtime --------
    FROM node:18-alpine
    
    WORKDIR /app
    
    # Copiar solo package.json del backend y deps de producción
    COPY backend/package*.json ./
    RUN npm install --omit=dev
    
    # Copiar dist del backend compilado
    COPY --from=backend-build /app/backend/dist ./dist
    
    # Copiar business-logic ya listo dentro de node_modules
    COPY --from=backend-build /app/node_modules/digistock-business-logic ./node_modules/digistock-business-logic
    
    EXPOSE 3000
    CMD ["node", "dist/main.js"]
    