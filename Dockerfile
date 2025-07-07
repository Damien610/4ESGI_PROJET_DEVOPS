FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-db.sh ./wait-for-db.sh
RUN chmod +x wait-for-db.sh

CMD ["./wait-for-db.sh"]
