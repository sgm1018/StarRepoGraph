# Usa la imagen oficial de Node.js
FROM node:lts-alpine

WORKDIR /app

COPY . .

ENV PORT=4321
ENV RedisUrl='redis://localhost:6379'

RUN apk add --no-cache redis \
    && redis-server --daemonize yes

# Genera el archivo Entorno.ts
RUN echo "export const Entorno = { Api: 'https://api.github.com', Token: '', Port: process.env.PORT, Host: true, RedisUrl: process.env.RedisUrl };" > Entorno.ts

RUN chmod 777 Entorno.ts

RUN npm install
RUN npm run build

EXPOSE 4321

CMD redis-server --daemonize yes && node ./dist/server/entry.mjs --host 0.0.0.0 --port $PORT
