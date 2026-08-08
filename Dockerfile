# ---------- Build stage ----------
FROM harbor.azsoftware.az/public/node:24-alpine AS build

ENV NODE_OPTIONS=--max-old-space-size=4096
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ---------- Serve stage ----------
FROM harbor.azsoftware.az/public/nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]