import express, {Request, Response} from "express";
import {handleErrorController, handleSuccessController, handleValidationBody} from "../../utils/func";
import {body} from "express-validator";
import {activityGroupsService} from "./service";

const router = express.Router();

// GET ALL OR BY ACTIVITY_ID
router.route('/').get((req, res) => {
    return activityGroupsService.getAll()
        .then((data) => handleSuccessController(res, data))
        .catch((e) => handleErrorController(res, e))
});

// GET BY ID
router.route('/:id').get((req, res) => {
    const {id} = req.params;
    return activityGroupsService.getById(res, Number(id))
        .then((data) => handleSuccessController(res, data))
        .catch((e) => handleErrorController(res, e))
})

// CREATE
router.route('/').post(
    body('title', 'title is required').notEmpty(),
    body('email', 'email is required').notEmpty().isEmail().withMessage({message: 'email invalid'}),
    (req: Request, res: Response) => {
        const {title, email} = req.body;
        return activityGroupsService.create(req, title, email)
            .then((data) => handleSuccessController(res, data))
            .catch((e) => handleErrorController(res, e))
    })

// DELETE BY ID
router.route('/:id').delete(
    (req: Request, res: Response) => {
        const {id} = req.params;
        return activityGroupsService.deleteById(res, Number(id))
            .then(() => handleSuccessController(res, {}))
            .catch((e) => handleErrorController(res, e))
    })

// UPDATE
router.route('/').put(
    body('id', 'id is required').notEmpty(),
    body('email').isEmail().withMessage({message: 'email invalid'}),
    (req: Request, res: Response) => {
        handleValidationBody(req);
        const {id, title, email} = req.body;
        return activityGroupsService.update(req, res, Number(id), title, email)
            .then((data) => handleSuccessController(res, data))
            .catch((e) => handleErrorController(res, e))
    })

module.exports = router;
