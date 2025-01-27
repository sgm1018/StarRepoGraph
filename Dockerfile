FROM node:lts-alpine AS runtime
WORKDIR /app

COPY . .


ENV PORT=4321
ENV RedisUrl='redis://localhost:6379'

RUN apk add --no-cache redis \
&& redis-server --daemonize yes

RUN apk add --no-cache coreutils


RUN echo "export const Entorno = { \
Api: 'https://api.github.com', \
Token: '', \
Port: $PORT, \
Host: true, \
RedisUrl: $RedisUrl \
}" > Entorno.ts

# RUN npm install
# RUN npm run build


EXPOSE 4321

# Start Redis and your Node.js application
# CMD node ./dist/server/entry.mjs
CMD ["tail -f /dev/null"]
