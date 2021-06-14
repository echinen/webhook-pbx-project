FROM node:8.9.4
MAINTAINER Eric Chinen
COPY . /var/www
WORKDIR /var/www/backend
RUN npm install
ENTRYPOINT npm start
EXPOSE 3000