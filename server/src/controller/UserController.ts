import {User} from "../models/models.ts";
import {RequestHandler} from "express";

class UserController {
    getAll: RequestHandler = async (req, res, next) => {
        let users = await User.findAll();

        if(users) {
            return res.json(users.map(user => {
                const updatedUser = {
                    id: user.id,
                    role: user.role,
                    name: user.name ?? '',
                    surname: user.surname ?? '',
                    patron: user.patron ?? '',
                    fullName: `${user.surname} ${user.name} ${user.patron}`,
                };

                if(!updatedUser.name && !updatedUser.surname && !updatedUser.patron) {
                    updatedUser.fullName = `Неизвестный пользователь id ${user.id}`;
                }

                return updatedUser;
            }));
        }
        else {
            return res.json({
                message: "Пользователи не найдены",
            });
        }
    }
}

export default new UserController();