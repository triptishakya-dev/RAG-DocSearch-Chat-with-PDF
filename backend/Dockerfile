# Production Dockerfile for Backend
FROM node:20-alpine

WORKDIR /app

# Copy package files and prisma schema first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with legacy-peer-deps to fix version conflicts
RUN npm install --legacy-peer-deps
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Copy the startup script
COPY start.sh .
RUN chmod +x start.sh

# Expose the API port
EXPOSE 8000

# Start both API and Worker
CMD ["./start.sh"]
