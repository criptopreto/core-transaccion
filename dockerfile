FROM node:18.5.0-alpine

RUN mkdir /core

WORKDIR /core

COPY . /core/

EXPOSE 3001

RUN yarn install
