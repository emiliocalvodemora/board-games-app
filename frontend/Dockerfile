FROM node:25

WORKDIR /frontend

COPY . .

RUN npm ci --no-audit --legacy-peer-deps || npm ci --no-audit --legacy-peer-deps --maxsockets 1

RUN npm run build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "dist"]
