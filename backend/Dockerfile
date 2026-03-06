FROM node:20-alpine

WORKDIR /backend

COPY . .

RUN npm ci --no-audit || npm ci --no-audit --maxsockets 1

EXPOSE 5001

CMD [ "npm", "start" ]