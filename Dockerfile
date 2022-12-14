FROM node

COPY . .

RUN npm install
RUN npm install -g nodemon
RUN npm install ts-node --save-dev
RUN npm install typescript -g
RUN npm install typescript --save-dev

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]
