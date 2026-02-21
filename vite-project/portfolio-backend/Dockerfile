# Use official Node LTS
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy rest of the application
COPY . .

# Expose port
ENV PORT=4000
EXPOSE 4000

# Create a data dir inside container for persistence across restarts if using volumes
RUN mkdir -p /usr/src/app/data

CMD ["node", "server.js"]
