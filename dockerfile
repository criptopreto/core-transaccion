FROM node:latest

RUN mkdir /core

WORKDIR /core

COPY package.json yarn.lock /core/

RUN YARN

COPY . /core

EXPOSE 3001

RUN yarn install

CMD ["node", "app.js"]