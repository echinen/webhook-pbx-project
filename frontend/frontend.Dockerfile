# base image
FROM node:8.9.4

# created by
MAINTAINER Eric Chinen

# add yarn.lock and package.json
ADD yarn.lock /yarn.lock
ADD package.json /package.json

# copy local path
COPY . /app

# root path
WORKDIR /app/

#  install libraries/modules
RUN yarn

# build webpack
RUN yarn build

# run webpack
ENTRYPOINT yarn start

EXPOSE 3002