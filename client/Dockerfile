FROM node:alpine

WORKDIR /react-docker/

COPY public/ /react-docker/public
COPY src/ /react-docker/src
COPY ./package.json /react-docker/

RUN npm i

COPY . . 
CMD ['npm','start','run']