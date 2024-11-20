FROM node:22-slim
WORKDIR /app
RUN curl -fsSL https://bun.sh/install | bash
COPY package*.json ./
COPY bun.lockb ./
RUN bun install
COPY . .
EXPOSE 8000
CMD [ "bun", "start" ]