FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# The nginx config will be mounted from a dedicated reverse proxy in production

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]