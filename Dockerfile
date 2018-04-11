FROM node

COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .

CMD MONGO_URL=$MONGO_URL PORT=$PORT npm run start:prod
