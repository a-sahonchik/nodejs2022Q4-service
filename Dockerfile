ARG NODE_VERSION=18.14.0

FROM node:${NODE_VERSION}-alpine as nodejs2022q4_service_node_dev

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

VOLUME /usr/src/app/node_modules

EXPOSE ${PORT}

ENTRYPOINT ./docker-entrypoint.sh
