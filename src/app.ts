import express from 'express';
import morgan from 'morgan';
import {connection} from './config/mysql';
// import {middleware} from "./config/middleware";

// Controller
const todo = require('./route/todo');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Connect to MySQL Database
connection.connect(function(err){
    if(err) return console.error('error :', err.message);
    console.log('Connected to the MySQL server.')
})
// Adding Middleware that always called before each api called
// app.use(middleware);

// Routes
app.use('/todo-items', todo);

const port = process.env.BROWSER_PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
