import {validationResult} from "express-validator";
import {connection} from "../config/mysql";
import {handleResult, handleRollBackCon} from "./func";
import {Request, Response} from "express";

const createAndSelect = (res: Response, req: Request, sqlInsert: string, tableName: string) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return connection.beginTransaction(function(err) {
        if(err) return handleResult(res, err?.message, {});
        connection.query(
            sqlInsert,
            function (err, result) {
                if(err) return handleRollBackCon(res, err?.message);
                connection.commit(function(err) {
                    if(err) return handleRollBackCon(res, err?.message);
                    if("insertId" in result){
                        return connection.query(
                            `SELECT * FROM ${tableName} WHERE id = ${result.insertId}`,
                            function(err2, result2) {
                                if(err2) return handleRollBackCon(res, err2?.message);
                                connection.end(function() {
                                    if(Array.isArray(result2)) return handleResult(res, undefined, result2[0])
                                    return handleResult(res, `Cannot find todo item with ID ${result.insertId}`, {})
                                })
                            }
                        )
                    }
                    return handleRollBackCon(res, 'Cannot find insertId');
                })
            }
        )
    })
}

const deleteWithValidation = (res: Response, req: Request, tableName: string) => {
    const {id} = req.params;
    connection.beginTransaction(function(err) {
        if(err) return handleResult(res, err?.message, {});
        connection.query(
            `SELECT * FROM ${tableName} WHERE id = ${id};`,
            function (err, result) {
                if(err) return handleRollBackCon(res, err?.message);
                if(Array.isArray(result) && !result.length) return handleResult(res, `Cannot find todo item with ID ${id}`, {}, 404)
                return connection.commit(function(err) {
                    if(err) return handleRollBackCon(res, err?.message);
                    return connection.query(
                        `DELETE FROM todo WHERE id=${id}`,
                        function(err2, result2) {
                            if(err2) return handleRollBackCon(res, err2?.message);
                            return connection.end(function() {
                                return handleResult(res, `Success delete ${tableName} with ID ${id}`, {}, 200, "Success")
                            })
                        }
                    )
                })
            }
        )
    })
}

export {createAndSelect, deleteWithValidation}
