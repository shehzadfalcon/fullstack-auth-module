FROM node:lts-alpine

WORKDIR /usr/src/app

COPY .env .env

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]