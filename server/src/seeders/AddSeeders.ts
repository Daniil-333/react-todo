import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";
import {InferCreationAttributes} from "sequelize";
import {Task, User} from "../models/models.js";
import {Status, StatusType} from "../const/types/status.js";
import {Priority, PriorityType} from "../const/types/priority.js";
import {Role, RoleType} from "../const/types/role.js";


const AddUsers = async () => {
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

    const dummyData: InferCreationAttributes<User, { omit: 'fullName' | 'id' }>[] = [];
    for(let i = 0 ; i < 50 ; i++) {
        const hashPassword = await bcrypt.hash(faker.internet.password(), 5);
        dummyData.push({
            login: faker.internet.email(),
            password: hashPassword,
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            role: faker.helpers.enumValue(Role) as RoleType,
            patron: faker.person.middleName(),
        });
    }

    await createUser(dummyData);
}

const AddTasks = async () => {
    const dummyData: InferCreationAttributes<Task, { omit: 'id' }>[] = [];
    const usersObj = await User.findAll();
    const users: number[] = usersObj
        .filter(user => user.id !== null && user.id !== undefined)
        .map(user => user.id as number);

    for(let i = 0 ; i < 100 ; i++) {
        const endDate = [faker.date.future(), faker.date.past(), faker.date.soon({days: 1})];
        dummyData.push({
            title: faker.person.jobTitle(),
            description: faker.lorem.sentences(10),
            end_at: faker.helpers.arrayElement(endDate),
            priority: faker.helpers.enumValue(Priority) as PriorityType,
            status: faker.helpers.enumValue(Status) as StatusType,
            creator_id: faker.helpers.arrayElement(users),
            executor_id: faker.helpers.arrayElement(users),
        });
    }

    await createTask(dummyData);
}

const MigrateData = async () => {
    const users = await getUsers();

    if(users.length >= 51) return;

    await AddUsers();
    await AddTasks();
}

export {
    MigrateData
}

async function createTask(dummyData: InferCreationAttributes<Task, { omit: 'id' }>[]) {
    await Task.bulkCreate(dummyData);
}
async function createUser(dummyData: InferCreationAttributes<User, { omit: 'fullName' | 'id' }>[]) {
    await User.bulkCreate(dummyData);
}

async function getUsers() {
    return await User.findAll();
}