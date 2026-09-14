# Stage 1: Build React App
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Stage 2: Serve via Nginx
FROM nginx:alpine
# If Create React App was used instead of Vite, change 'dist' to 'build'
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
