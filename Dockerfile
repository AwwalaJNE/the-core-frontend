# Build stage
FROM node:22-alpine AS build-stage

# Install build dependencies only for npm install
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && npm install -g npm@latest \
    && npm cache clean --force

WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Remove build dependencies to keep image small
RUN apk del .build-deps

# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy build output
COPY --from=build-stage /app/dist /app

# Copy nginx config if you have one
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
