FROM node:10

WORKDIR /usr/src/app

COPY ./package.json ./yarn.lock ./
COPY ./server/package.json ./server/
COPY ./client/package.json ./client/

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8081

CMD ["yarn", "start"]
