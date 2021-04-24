##### Stage 1
FROM node:14.15.4 as node
ENV NODE_ENV production
LABEL author="Tore Sveaass"
WORKDIR /app
COPY ["package.json", "package-lock.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 3000
CMD npm start