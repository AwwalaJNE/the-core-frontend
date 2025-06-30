FROM node:10-alpine as build-stage
RUN apk add g++ make py3-pip
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
