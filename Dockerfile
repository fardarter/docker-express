FROM mhart/alpine-node:10

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
EXPOSE 80
CMD [ "npm", "run", "start" ]