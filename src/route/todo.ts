import express, {Request, Response} from "express";
import {connection} from "../config/mysql";
import {body} from "express-validator";
import {currentDate, handleResult} from "../utils/func";
import {createAndSelect, deleteWithValidation} from '../utils/crud';

const router = express.Router();

// GET ALL
router.route('/').get((req: Request, res: Response) => {
    const {activity_group_id} = req.query;
    connection.query(
        activity_group_id ?
            `SELECT * FROM todo WHERE activity_group_id = ${activity_group_id};` :
            `SELECT * FROM todo;`,
        function(err, results) {
            return handleResult(res, err?.message, results);
        }
    );
})


// GET BY ID
router.route('/:id').get((req: Request, res: Response) => {
    const {id} = req.params;
    connection.query(`SELECT * FROM todo WHERE id = ${id}`,
        function(err, results) {
            return handleResult(res, err?.message, results);
        }
    );
})

// CREATE
router.route('/').post(
    body('title', 'title is required').notEmpty(),
    body('activityGroupId', 'activeGroupId is required').notEmpty(),
    (req: Request, res: Response) => {
        const {title, activityGroupId} = req.body;
        const sqlInsert: string = `INSERT INTO todo (title, is_active, priority, created_at, updated_at, activity_group_id) VALUES ("${title}", true, 'very-high', "${currentDate}", "${currentDate}", "${activityGroupId}");`
        return createAndSelect(res, req, sqlInsert, 'todo');
    })

// DELETE
router.route('/:id').delete((req: Request, res: Response) => {
    return deleteWithValidation(res, req, 'todo')
})

module.exports = router;
