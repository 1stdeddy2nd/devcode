FROM node

COPY . .

RUN npm install
RUN npm install -g nodemon
RUN npm install ts-node --save-dev
RUN npm install typescript -g
RUN npm install typescript --save-dev
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3030
