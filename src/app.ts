import mysql from 'mysql2';
import express, {NextFunction, Request, Response} from 'express';
import { body, validationResult } from "express-validator";
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const currentDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'mydb',
    user: 'root',
    password: 'mynewpassword',
    port: 3306
})

connection.connect(function(err){
    if(err) return console.error('error :', err.message);
    console.log('Connected to the MySQL server.')
})

function logger (req: Request, res: Response, next: NextFunction){
    req.admin = 'Admin';
    next();
}
app.use(logger);

app.get('/', (req: Request, res: Response) => {
    console.log(req.admin);
    connection.query(
        'SELECT * FROM todo',
        function(err, results) {
            if(err) return res.send(err);
            return res.send(results);
        }
    );
})


app.post(
    '/todo',
    body('title').notEmpty(),
    body('isActive', 'isActive required').notEmpty(),
    body('priority', 'priority is required').notEmpty(),
    body('activityGroupId', 'activeGroupId is required').notEmpty(),
    (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {title, isActive, priority, activityGroupId} = req.body;
    connection.query(
        `INSERT INTO todo (title, is_active, priority, created_at, updated_at, activity_group_id) VALUES ("${title}", "${isActive}", "${priority}", "${currentDate}", "${currentDate}", "${activityGroupId}");`,
        function(err, results) {
            if(err) return res.send(err);
            return res.send(results);
        }
    );
})

app.listen(3000, () => console.log(`Listening on port 3000...`));
