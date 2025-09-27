# backend/Dockerfile - VERSIÓN SIMPLE Y A PRUEBA DE BALAS

FROM node:18-alpine

WORKDIR /app

# Copia TODOS los package.json para que npm entienda los workspaces
COPY package*.json ./
COPY backend/package.json ./backend/
COPY business-logic/package.json ./business-logic/

# Limpia node_modules y dist antes de instalar y construir
RUN rm -rf node_modules dist

# Instala TODAS las dependencias. Esto es clave.
RUN npm install

# Copia el resto del código
COPY . . 

# Construye ambos proyectos
RUN npm run build --workspace=business-logic
RUN npm run build --workspace=backend

# Cambia al directorio del backend para ejecutar desde ahí
WORKDIR /app/backend

EXPOSE 3000
# Comando para iniciar la aplicación en producción
CMD [ "node", "dist/main" ]