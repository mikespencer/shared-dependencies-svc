FROM node

WORKDIR /app

COPY . /app

RUN npm install --production

CMD PORT=$PORT npm run start:prod