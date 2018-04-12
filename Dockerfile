FROM node

WORKDIR /app

COPY . /app

RUN npm install --production

CMD MONGODB_URI=$MONGODB_URI PORT=$PORT npm run start:prod