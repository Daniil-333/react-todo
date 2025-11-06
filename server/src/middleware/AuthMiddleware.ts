import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export default function (req: Request, res: Response, next:NextFunction ) {
    if(req.method === "OPTIONS") {
        next();
        return;
    }

    try {
        const token = req?.headers?.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: 'Не авторизован'});
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY as string);

        next();
    }catch (e) {
        res.status(401).json({message: 'Не авторизован'});
    }
}