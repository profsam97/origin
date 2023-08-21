FROM node:alpine
LABEL author = "Samuel"
WORKDIR /app


COPY package.json .

RUN npm install

COPY . .

RUN npm run buiild

EXPOSE 3000

CMD ["npm", "start"]
