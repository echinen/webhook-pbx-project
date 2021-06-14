FROM node:8.9.4
MAINTAINER Eric Chinen
COPY . /var/www
WORKDIR /var/www/mock-pbx
RUN npm install
ENTRYPOINT npm start
EXPOSE 3001