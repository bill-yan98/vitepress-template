FROM docker.das-security.cn/node:alpine-16.16.0 AS install

WORKDIR /node/app
RUN pnpm config set registry 'https://registry.npmmirror.com/'
COPY package.json .
COPY package-lock.json .
RUN npm run install

FROM docker.das-security.cn/node:alpine-16.16.0 AS build

WORKDIR /node/app
COPY --from=install /node/app/node_modules/ ./node_modules/
COPY . .
RUN npm run build

FROM docker.das-security.cn/nginx:alpine AS product

COPY --from=build /node/app/dist/ /usr/share/nginx/html/
