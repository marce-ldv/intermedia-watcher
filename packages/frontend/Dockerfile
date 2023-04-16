FROM node:16-alpine3.12

WORKDIR /usr/src/app

RUN mkdir -p packages/frontend
RUN mkdir -p packages/backend

COPY ./package*.json ./

COPY ./yarn.lock ./

COPY ./packages/frontend/package*.json ./packages/frontend

RUN yarn install

COPY ./packages/frontend ./packages/frontend

RUN yarn workspace frontend build

EXPOSE 3000

CMD [ "yarn", "workspace", "frontend", "start" ]
