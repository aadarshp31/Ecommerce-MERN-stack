FROM alpine AS DB-DEPLOY

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories

RUN apk update
RUN apk add mongodb=3.4.4-r0
RUN apk add mongodb-tools

VOLUME [ "/data/db" ]
WORKDIR /data
EXPOSE 27017

ENTRYPOINT [ "mongod" ]

FROM node:12.18.3-alpine3.9 AS NODE-DEPLOY

WORKDIR /var/ecommerceApp/backend

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]
