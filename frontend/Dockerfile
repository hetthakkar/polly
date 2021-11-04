FROM node:14
COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install
EXPOSE 3001
COPY . ./
CMD npm run start