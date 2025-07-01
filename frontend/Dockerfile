FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# This final stage contains only the build artifacts and a minimal OS.
# It doesn't run a web server.
FROM alpine:latest

# Copy the built assets from the 'build' stage.
COPY --from=build /app/dist /app/dist

# The container will start, allow Docker to copy the data to the volume,
# and then exit.
CMD ["/bin/true"]