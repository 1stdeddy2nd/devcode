// work same with curdate() at MySQL
import {Response} from "express";
import {connection} from "../config/mysql";

const currentDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');

// handle result after query
const handleResult = (res: Response, err: string | undefined, data: any, resStatus?: number, statusMsg?: string) => {
    if(err) {
        return res.status(resStatus ?? 500).json({
            status: statusMsg ?? "Error",
            message: err,
            data: {}
        });
    }
    return res.status(resStatus ?? 200).json({
        status: statusMsg ?? "Success",
        message: "Success",
        data: data
    });
}

// connection error auto rollback
const handleRollBackCon = (res: Response, errMsg: string) => {
    return connection.rollback(function(){
        return handleResult(res, errMsg, {})
    })
}

export {currentDate, handleResult, handleRollBackCon}
