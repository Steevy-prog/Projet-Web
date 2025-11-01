FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose Vite port
EXPOSE 5173

# Run Vite with host flag
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]