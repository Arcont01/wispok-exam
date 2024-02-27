FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --silent && mv node_modules ../

EXPOSE 3000

CMD ["npm", "run", "dev"]
