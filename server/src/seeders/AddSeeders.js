import {faker} from "@faker-js/faker";
import {Task, User} from "../models/models.ts";
import bcrypt from "bcrypt";
import {PriorityVariant, TaskStatus, Role} from '../const/enums.ts';

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

    const dummyData = [];
    for(let i = 0 ; i < 10 ; i++) {
        const hashPassword = await bcrypt.hash(faker.internet.password(), 5);
        dummyData.push({
            login: faker.name.firstName(),
            password: hashPassword,
            name: faker.name.firstName(),
            surname: faker.name.lastName(),
            patron: faker.name.title(),
            role: faker.helpers.enumValue(Role),
        });
    }

    await createUser(dummyData);
}

const AddTasks = async () => {
    const dummyData = [];

    for(let i = 0 ; i < 10 ; i++) {
        dummyData.push({
            title: faker.name.jobTitle(),
            description: faker.lorem.sentences(10),
            end_at: faker.date.future(), //TODO здесь past or future or today
            priority: faker.helpers.enumValue(PriorityVariant),
            status: faker.helpers.enumValue(TaskStatus),
            creator_id: '',
            executor_id: '',
        });
    }

    await createTask(dummyData);
}

export {
    AddSuperUser,
    AddTasks,
}

async function createTask(dummyData) {
    await Task.bulkCreate(dummyData);
}
async function createUser(dummyData) {
    await User.bulkCreate(dummyData);
}