FROM node:latest
RUN mkdir /app
COPY package*.json ./
RUN npm install
WORKDIR /app
VOLUME /app
COPY . /app
EXPOSE 3000
CMD [ "npm", "start" ]
