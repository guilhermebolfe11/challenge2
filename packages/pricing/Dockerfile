FROM node:20.9.0-alpine
WORKDIR /usr/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD npm run deploy