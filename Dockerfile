FROM node:17-alpine as builder
WORKDIR /src

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /src/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]