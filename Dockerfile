FROM node

COPY package.json .
RUN npm install
COPY . .

CMD MONGO_URL=$MONGO_URL PORT=$PORT npm run start:prod
