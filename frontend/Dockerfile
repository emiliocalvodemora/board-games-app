# FROM node:20-alpine

# WORKDIR /frontend

# COPY . .

# RUN npm ci --no-audit --legacy-peer-deps || npm ci --no-audit --legacy-peer-deps --maxsockets 1

# RUN npm run build

# RUN npm install -g serve

# EXPOSE 3000

# # CMD ["serve", "dist"]
# CMD ["serve", "-s", "dist", "-l", "3000"]

FROM node:20-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]