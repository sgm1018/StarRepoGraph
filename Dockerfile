# Usa la imagen oficial de Node.js
FROM node:lts-alpine

WORKDIR /app

COPY . .


# Genera el archivo Entorno.ts
RUN echo "export const Entorno = { Api: 'https://api.github.com', Token: '', Port: process.env.APP_PORT, Host: true, RedisUrl: process.env.REDIS_URL };" > Entorno.ts

RUN chmod 777 Entorno.ts

RUN npm install
RUN npm run build

CMD node ./dist/server/entry.mjs --host 0.0.0.0 --port ${APP_PORT}
