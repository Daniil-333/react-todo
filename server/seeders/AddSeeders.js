import {User} from "../models/models.js";
import bcrypt from "bcrypt";

const AddSuperUser = async () => {
    const hashPassword = await bcrypt.hash('qwerty654321', 5);

    const superUser = await User.findOne({where: {login: 'owner@test.ru'}});

    if(!superUser) {
        await User.create({
            login: 'owner@test.ru',
            password: hashPassword,
            name: 'Luchizar',
            surname: 'Yablonev',
            patron: 'Wolfovich',
            role: "ADMIN",
        });
    }
}

export {
    AddSuperUser,
}