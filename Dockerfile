FROM node

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["npm", "start"]

EXPOSE 3030
