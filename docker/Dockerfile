FROM node:20.15.1-alpine as build

WORKDIR /var/www

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "dev"]