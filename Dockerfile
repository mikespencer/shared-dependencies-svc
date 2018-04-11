FROM node

COPY package.json package-lock.json .
RUN npm ci
COPY . .

CMD MONGO_URL=$MONGO_URL PORT=$PORT npm run start:prod
