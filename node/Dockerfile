FROM node:17.3.0

WORKDIR /var/www/html

COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["node","app.js"]