import ApiError from "../error/ApiError.js";
import {User} from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJWT = (id, login, role, fullName) => {
    return jwt.sign(
        {id, login, role, fullName},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

const createFullName = (user) => {
    return (!user.name && !user.surname && !user.patron) ?
        `Неизвестный пользователь id ${user.id}` :
        `${user.surname} ${user.name} ${user.patron}`;
}

class AuthController {
    async registration(req, res, next) {
        const { login, password, role } = req.body;

        if(!login || !password) {
            return next(ApiError.badRequest('Отсутствует Логин и(или) Пароль'))
        }

        const candidate = await User.findOne({where: {login}});
        if (candidate) {
            return next(ApiError.badRequest('Логин уже используется'))
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({login, role, password: hashPassword});
        const fullName = createFullName(user);

        const token = generateJWT(
            user.id,
            login,
            user.role,
            fullName,
        );

        return res.json({token})
    }

    async login(req, res, next) {
        const { login, password } = req.body;
        const user = await User.findOne({where: {login}});
        if(!user) {
            return next(ApiError.badRequest('Пользователь с таким логином не существует'))
        }

        let comparePassword = await bcrypt.compareSync(password, user.password);
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

    async check(req, res, next) {
        const token = generateJWT(
            req.user.id,
            req.user.login,
            req.user.role,
            req.user.fullName
        );
        return res.json({token})
    }
}

export default new AuthController();