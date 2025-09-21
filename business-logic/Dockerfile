# -------- STAGE 1: Build --------
    FROM node:18-alpine AS build

    WORKDIR /app
    
    # Copiamos package.json y package-lock.json primero
    COPY package*.json ./
    
    # Instalamos TODAS las dependencias (incluye dev: typescript, rimraf, etc.)
    RUN npm install
    
    # Copiamos el resto del código fuente
    COPY . .
    
    # Compilamos a JS (dist/)
    RUN npm run build
    
    
    # -------- STAGE 2: Runtime --------
    FROM node:18-alpine
    
    WORKDIR /app
    
    # Copiamos solo package.json para instalar dependencias de producción
    COPY package*.json ./
    
    # Instalamos solo dependencias de producción
    RUN npm install --omit=dev
    
    # Copiamos los archivos compilados desde la etapa de build
    COPY --from=build /app/dist ./dist
    
    # Exponemos el puerto (si lo usas para healthchecks o microservicio)
    EXPOSE 3001
    
    # Comando por defecto
    CMD ["node", "dist/index.js"]
    