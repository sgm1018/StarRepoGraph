FROM node:lts-alpine as runtime
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV PORT=4321

RUN sh -c 'echo "export const Entorno = { \
    Api: \"https://api.github.com\", \
    Token: \"\", \
    Port: $PORT, \
    Host: true \
}" > Entorno.ts'


EXPOSE 4321
CMD node ./dist/server/entry.mjs
