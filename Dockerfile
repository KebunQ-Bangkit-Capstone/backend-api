FROM oven/bun:1
WORKDIR /app
COPY package*.json ./
COPY bun.lockb ./
COPY prisma ./prisma/
RUN bun install
RUN bun prisma generate
COPY . .
EXPOSE 8000
CMD [ "bun", "start" ]