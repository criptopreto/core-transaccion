FROM node:latest

RUN mkdir /core

WORKDIR /core

COPY . /core

RUN yarn install