FROM node:12.18.3-alpine3.9

WORKDIR /var/ecommerceApp/frontend

COPY ./package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]