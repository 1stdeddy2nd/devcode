FROM node

COPY . .

RUN npm install

CMD ["node", "src/app.ts"]

EXPOSE 3030
