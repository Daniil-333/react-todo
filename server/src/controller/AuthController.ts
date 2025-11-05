import ApiError from "../error/ApiError.ts";
import {User as UserModel} from "../models/models.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction, RequestHandler} from "express";
import {type JWTProps} from "../const/types.ts";


const generateJWT: JWTProps = (id, login, role, fullName) => {
    return jwt.sign(
        {id, login, role, fullName},
        process.env.SECRET_KEY as string,
        {expiresIn: '24h'}
    );
}

const createFullName = (user: UserModel) => {
    return (!user.name && !user.surname && !user.patron) ?
        `Неизвестный пользователь id ${user.id}` :
        `${user.surname} ${user.name} ${user.patron}`;
}

class AuthController {
    registration: RequestHandler = async (req, res, next)=> {
        const { login, password, role } = req.body;

        if(!login || !password) {
            return next(ApiError.badRequest('Отсутствует Логин и(или) Пароль'))
        }

        const candidate = await UserModel.findOne({where: {login}});
        if (candidate) {
            return next(ApiError.badRequest('Логин уже используется'))
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await UserModel.create({login, role, password: hashPassword});
        const fullName = createFullName(user);

        const token = generateJWT(
            user.id,
            login,
            user.role,
            fullName,
        );

        return res.json({token})
    }

    login: RequestHandler = async (req, res, next) => {
        const { login, password } = req.body;
        const user = await UserModel.findOne({where: {login}});
        if(!user) {
            return next(ApiError.badRequest('Пользователь с таким логином не существует'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.badRequest('Пользователь ввел неверный пароль'))
        }
        const fullName = createFullName(user);

        const token = generateJWT(
            user.id,
            user.login,
            user.role,
            fullName
        );

        return res.json({token})
    }

    async check (req: Request, res: Response, next: NextFunction) {
        if(!req.hasOwnProperty('user')) {
            return next(ApiError.badRequest('Аутентификация не пройдена!'))
        }

        const user = req.user as UserModel;

        const token = generateJWT(
            user.id,
            user.login,
            user.role,
            user.fullName
        );
        return res.json({token});
    }
}

export default new AuthController();