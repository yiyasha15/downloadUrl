# syntax=docker/dockerfile:1
 FROM node:12-alpine
 RUN apk add --no-cache python g++ make
 WORKDIR /app
 COPY package.json /app
 COPY . .
 RUN npm install --production
 CMD ["node", "fileDownloadDocker.js"]