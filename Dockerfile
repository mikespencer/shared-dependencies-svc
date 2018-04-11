FROM node

COPY package.json package-lock.json .
RUN npm i
COPY . .

CMD MONGO_URL=$MONGO_URL PORT=$PORT npm run start:prod
