FROM oven/bun:1

WORKDIR /usr/src/app

COPY index.ts ./
COPY package.json ./
COPY bun.lock ./

RUN bun install

EXPOSE 8080

CMD [ "bun", "run", "start" ]
