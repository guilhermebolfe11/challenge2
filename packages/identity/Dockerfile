FROM node:20.9.0-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3030
CMD npm run deploy