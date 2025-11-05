import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";
import {PriorityType} from "./types/priority.ts";
import {StatusType} from "./types/status.ts";
import {RoleType} from "./types/role.ts";

class User extends Model<
    InferAttributes<User, { omit: 'fullName' }>,
    InferCreationAttributes<User, { omit: 'fullName' }>
> {
    declare id: CreationOptional<number>;
    declare login: string;
    declare password: string;
    declare name: CreationOptional<string | null>;
    declare surname: CreationOptional<string | null>;
    declare patron: CreationOptional<string | null>;
    declare role: RoleType;
    declare supervisor?: CreationOptional<number | null>;

    get fullName(): string {
        return [this.surname, this.name, this.patron].filter(Boolean).join(' ') || this.login;
    }
}

class Task extends Model<
    InferAttributes<Task>,
    InferCreationAttributes<Task>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare end_at: Date;
    declare priority: PriorityType;
    declare status: StatusType;
    declare creator_id: number;
    declare executor_id: number;
}


export {
    User,
    Task
}