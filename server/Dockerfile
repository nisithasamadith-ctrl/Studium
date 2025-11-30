FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install

COPY src ./src

RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
