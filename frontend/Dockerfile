# Stage 1: build Angular app
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# this uses the default "production" config from angular.json
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:alpine
# use your project name in the dist path:
COPY --from=build /app/dist/Front-student-managment/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]