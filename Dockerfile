FROM node:lts-alpine AS runtime
WORKDIR /app

COPY . .


ENV PORT=4321
ENV RedisUrl='redis://localhost:6379'

RUN apk add --no-cache redis \
&& redis-server --daemonize yes


# RUN echo "export const Entorno = { \
# API: 'https://api.github.com', \
# TOKEN: '', \
# PORT: $PORT, \
# HOST: true, \
# REDIS_URL: $RedisUrl \
# }" > Entorno.ts

RUN npm install
RUN npm run build


EXPOSE 4321

# Start Redis and your Node.js application
CMD node ./dist/server/entry.mjs
