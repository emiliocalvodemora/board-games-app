FROM node:25

WORKDIR /backend

COPY . .

RUN npm ci --no-audit || npm ci --no-audit --maxsockets 1

EXPOSE 3000

CMD [ "npm", "start" ]