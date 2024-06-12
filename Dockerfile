FROM node:21.7.2-alpine3.19

WORKDIR /app

COPY ./ace .

RUN npm install --legacy-peer-deps
