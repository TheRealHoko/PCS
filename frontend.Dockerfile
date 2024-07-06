FROM node:21.7.2-alpine3.19 AS build

WORKDIR /app

COPY ./ace/package*.json .

RUN npm install --legacy-peer-deps

COPY ./ace .

RUN npx nx run frontend:build:production

FROM nginx:stable-alpine3.19-slim

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist/apps/frontend .
