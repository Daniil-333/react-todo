import {faker} from "@faker-js/faker";
import {Task, User} from "../models/models.ts";
import bcrypt from "bcrypt";
import {Status, StatusType} from "../const/types/status.ts";
import {Priority, PriorityType} from "../const/types/priority.ts";
import {Role, RoleType} from "../const/types/role.ts";
import {InferCreationAttributes} from "sequelize";


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

    const dummyData: InferCreationAttributes<User>[] = [];
    for(let i = 0 ; i < 10 ; i++) {
        const hashPassword = await bcrypt.hash(faker.internet.password(), 5);
        dummyData.push({
            login: faker.name.email(),
            password: hashPassword,
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            patron: faker.name.middleName(),
            role: faker.helpers.enumValue(Role) as RoleType,
        });
    }

    await createUser(dummyData);
}

const AddTasks = async () => {
    const dummyData: InferCreationAttributes<Task>[] = [];

    for(let i = 0 ; i < 10 ; i++) {
        dummyData.push({
            title: faker.name.jobTitle(),
            description: faker.lorem.sentences(10),
            end_at: faker.date.future(), //TODO здесь past or future or today
            priority: faker.helpers.enumValue(Priority) as PriorityType,
            status: faker.helpers.enumValue(Status) as StatusType,
            creator_id: '', //TODO здесь любой ID из Users
            executor_id: '', //TODO здесь любой ID из Users
        });
    }

    await createTask(dummyData);
}

export {
    AddSuperUser,
    AddTasks,
}

async function createTask(dummyData: InferCreationAttributes<Task>[]) {
    await Task.bulkCreate(dummyData);
}
async function createUser(dummyData: InferCreationAttributes<User>[]) {
    await User.bulkCreate(dummyData);
}