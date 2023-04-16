FROM node:16.19-alpine

WORKDIR /code

COPY ./ ./
RUN yarn install

RUN yarn build
EXPOSE 5000
CMD ["yarn", "start:coins:backend"]
