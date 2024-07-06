# build stage
FROM node:21-alpine3.19 AS build

WORKDIR /app

COPY ./ace/package*.json .

RUN npm install --legacy-peer-deps

COPY ./ace .

RUN npx nx reset
RUN npx nx run backend:build:production

CMD [ "node", "dist/apps/backend/main.js" ]