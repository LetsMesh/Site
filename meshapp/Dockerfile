# /Site/meshapp/Dockerfile

FROM node:latest

WORKDIR /app

COPY package.json .env /app/

RUN npm install

COPY . /app/

CMD ["npm", "start"]
