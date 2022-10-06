import express from 'express';
import {prisma} from "./config/prisma";
const todoCon = require('./routes/todo-items/controller');
const activityCon = require('./routes/activity-groups/controller');

const app = express();
app.use(express.json());

prisma.$connect()
    .then(() => console.log('Connected to the MySQL Server.'))
    .catch((err: any) => console.error('Error: ', err.message))

app.use('/todo-items', todoCon);
app.use('/activity-groups', activityCon);

app.listen(3030, () => console.log(`Listening on port 3030...`));
