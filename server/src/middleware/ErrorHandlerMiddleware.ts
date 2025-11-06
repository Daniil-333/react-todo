import {Request, Response, NextFunction} from "express";
import ApiError from '../error/ApiError.js';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: `Не обработанная ошибка. ${err}`});
}