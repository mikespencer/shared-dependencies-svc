FROM node

WORKDIR /app

COPY . /app

RUN npm install --production

CMD MONGO_URL=$MONGO_URL PORT=$PORT npm run start:prod