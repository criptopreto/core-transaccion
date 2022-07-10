FROM node:latest

RUN mkdir /core

WORKDIR /core

COPY . /core

RUN npm install