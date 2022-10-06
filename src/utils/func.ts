import {Response, Request} from "express";
import {validationResult} from "express-validator";
import * as http from "http";
import * as https from "https";

// handle result for each API
const handleResult = (res: Response, code: number, status: string, message: any, data: any) => {
    return res.status(code).json({
        status: status,
        message: message,
        data: data
    });
}

// controller success get data
const handleSuccessController = (res: Response, data: any) => {
    return handleResult(res, 200, 'Success', 'Success', data);
}

// controller catcher error by code handler
const handleErrorController = (res: Response, e: {message:string, code?:number}) => {
    const status = ():string => {
        if(e.code === 403) return 'Bad Request'
        if(e.code === 404) return 'Not Found'
        return 'Error'
    }
    return handleResult(res, e.code ?? 500, status(), e.message, {});
}

// handle body validation
const handleValidationBody = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw ({message: errors.array(), code: 403})
}

export {handleResult, handleValidationBody, handleErrorController, handleSuccessController}
