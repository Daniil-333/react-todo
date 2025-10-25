import ApiError from "../error/ApiError.js";
import {User} from "../models/models.js";

class UserController {
    async getAll(req, res, next) {
        let users = await User.findAll();

        if(users) {
           users = users.map(user => {
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
           });
        }

        return res.json(users);
    }
}

export default new UserController();