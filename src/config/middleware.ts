import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {handleResult} from "../utils/func";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    next();
}
