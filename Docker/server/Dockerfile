FROM node:21-alpine3.17 AS builder
WORKDIR /app
COPY ../../package.json  ./
RUN npm install
COPY ../../ .
RUN npm run build

FROM node:21-alpine3.17
EXPOSE 3000
WORKDIR /app
COPY ../../package.json  ./
COPY --from=builder /app/dist /dist
RUN npm install
COPY ../../ .
CMD ["node", "dist/app.js"]