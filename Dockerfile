FROM node:17-alpine as builder
WORKDIR /src

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /src/build .
# COPY --from=react-build /src/build /usr/share/nginx/html
# COPY --from=builder ./nginx.conf /etc/nginx/nginx.conf
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM nginx:latest

COPY --from=builder /src/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]