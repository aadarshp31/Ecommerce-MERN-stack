FROM node:12.18.3-alpine3.9 as BUILD-stage

WORKDIR /var/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS DEPLOY-stage

COPY --from=BUILD-stage /var/app/build /usr/share/nginx/html

EXPOSE 80