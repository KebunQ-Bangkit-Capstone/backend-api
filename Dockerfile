FROM oven/bun:1
WORKDIR /app
COPY package*.json ./
COPY bun.lockb ./
RUN bun install
COPY . .
EXPOSE 8000
CMD [ "bun", "start" ]