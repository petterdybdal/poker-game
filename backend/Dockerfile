FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["nodemon", "--watch", "src", "--exec", "ts-node", "src/server.ts"]