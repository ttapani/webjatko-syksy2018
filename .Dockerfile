#! dockerfile
FROM mhart/alpine-node:8

COPY ./ ./app
EXPOSE 3000
WORKDIR /app

CMD ["yarn", "start"]