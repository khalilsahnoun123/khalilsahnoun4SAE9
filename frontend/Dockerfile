# Stage 1: build Angular app
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# uses defaultConfiguration: "production"
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/Front-student-managment/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
