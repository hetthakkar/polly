FROM node:12
COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install
COPY . ./
EXPOSE 3000
EXPOSE 3002
CMD ["npx", "serverless", "offline"]
