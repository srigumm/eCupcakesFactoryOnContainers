FROM node:9
RUN mkdir /app
WORKDIR /app
COPY src/React-web-ui/ .

RUN npm install --quiet

CMD ["npm", "start"]

EXPOSE 3000