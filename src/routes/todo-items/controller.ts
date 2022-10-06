import express, {Request, Response} from "express";
import {todoItemsService} from "./service";
import {handleErrorController, handleSuccessController, handleValidationBody} from "../../utils/func";
import {body} from "express-validator";

const router = express.Router();

// GET ALL OR BY ACTIVITY_ID
router.route('/').get((req, res) => {
    const {activity_group_id} = req.query;
    return (activity_group_id ?
        todoItemsService.getAllByActivityGroupId(Number(activity_group_id)) :
        todoItemsService.getAll())
        .then((data) => handleSuccessController(res, data))
        .catch((e: Error) => handleErrorController(res, e))
});

// GET BY ID
router.route('/:id').get((req, res) => {
    const {id} = req.params;
    return todoItemsService.getById(res, Number(id))
        .then((data) => handleSuccessController(res, data))
        .catch((e) => handleErrorController(res, e))
})

// CREATE
router.route('/').post(
    body('title', 'title is required').notEmpty(),
    body('activity_group_id', 'activity_group_id').notEmpty(),
    (req: Request, res: Response) => {
        const {title, activity_group_id} = req.body;
        return todoItemsService.create(req, title, activity_group_id)
            .then((data) => handleSuccessController(res, data))
            .catch((e) => handleErrorController(res, e))
    })

// DELETE BY ID
router.route('/:id').delete(
    (req: Request, res: Response) => {
        const {id} = req.params;
        return todoItemsService.deleteById(res, Number(id))
            .then(() => handleSuccessController(res, {}))
            .catch((e) => handleErrorController(res, e))
    })

// UPDATE
router.route('/').put(
    body('id', 'id is required').notEmpty(),
    (req: Request, res: Response) => {
        handleValidationBody(req);
        const {id, title} = req.body;
        return todoItemsService.update(req, res, Number(id), title)
            .then((data) => handleSuccessController(res, data))
            .catch((e) => handleErrorController(res, e))
    })

module.exports = router;
