import sequelize from "../db/db.ts";
import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

const PriorityVariant = ['low', 'medium', 'high']

const TodoStatus = ['created', 'progress', 'complete', 'cancel']

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
    declare role: CreationOptional<string>;
    declare supervisor: CreationOptional<number | null>;

    get fullName(): string {
        return [this.surname, this.name, this.patron].filter(Boolean).join(' ') || this.login;
    }
}

User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        login: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        name: {type: DataTypes.STRING},
        surname: {type: DataTypes.STRING},
        patron: {type: DataTypes.STRING, comment: 'Отчество'},
        role: {type: DataTypes.STRING, defaultValue: 'USER', comment: 'Роль'},
        supervisor: {type: DataTypes.INTEGER, allowNull: true, comment: 'Руководитель (пользователь)'},
    }, {
        sequelize,
        modelName: 'user',
        tableName: 'users'
    }
);

export const Task = sequelize.define("task", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, comment: 'Заголовок'}, // Заголовок
    description: {type: DataTypes.TEXT, allowNull: false, comment: 'Описание'}, // Описание
    end_at: {type: DataTypes.DATE, allowNull: false, comment: 'Дата окончания'}, // Дата окончания
    priority: {type: DataTypes.ENUM(...PriorityVariant), defaultValue:  PriorityVariant[0], allowNull: false, comment: 'Приоритет'}, // Приоритет
    status: {type: DataTypes.ENUM(...TodoStatus), defaultValue: TodoStatus[0], allowNull: false, comment: 'Статус'}, // Статус
    creator_id: {type: DataTypes.INTEGER, allowNull: false, comment: 'Создатель'}, // Создатель
    executor_id: {type: DataTypes.INTEGER, allowNull: false, comment: 'Ответственный'}, // Ответственный
})

User.hasMany(Task, {foreignKey: "creator_id", as: 'createdTasks'})
User.hasMany(Task, {foreignKey: "executor_id", as: 'assignedTasks'})
Task.belongsTo(User, {foreignKey: "creator_id", as: 'creator'})
Task.belongsTo(User, {foreignKey: "executor_id", as: 'executor'})

export {User};