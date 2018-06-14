FROM node:8-slim
WORKDIR /code
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./
CMD npm start
