import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import {RoleType} from "../const/types/role.js";

export default function (role: RoleType) {
    return function (req: Request, res: Response, next: NextFunction) {
        if(req.method === "OPTIONS") {
            next();
            return;
        }

        try {
            const token = req?.headers?.authorization?.split(' ')[1];

            if(!token) {
                return res.status(401).json({message: 'Не авторизован'});
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

            if(typeof decoded !== 'string' && decoded.role !== role) {
                return res.status(403).json({message: 'Нет доступа'});
            }

            req.body.user = decoded;
            next();
        }catch (e) {
            if(e instanceof jwt.TokenExpiredError) {
                return res.status(401).json({message: 'Токен не действителен'});
            }

            res.status(401).json({message: 'Не авторизован'});
        }
    }
}