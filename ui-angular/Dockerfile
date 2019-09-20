# Node 11+ image for Angular 8
FROM node:11.6.0-alpine AS ui-builder

COPY ./package.json /usr/src/app/
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install @angular/cli -g

# Bundle app source
COPY . /usr/src/app
RUN npm install && npm run build:ssr
# RUN npm install pm2  -g
# CMD pm2 start --no-daemon /usr/src/app/dist/server.js

FROM node:11.6.0-alpine
RUN mkdir -p /ui-angular-ssr
WORKDIR /ui-angular-ssr
COPY --from=ui-builder /usr/src/app/dist/ .
RUN npm install pm2  -g
CMD pm2 start --no-daemon /ui-angular-ssr/server.js
# EXPOSE 8080