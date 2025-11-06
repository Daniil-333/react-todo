import sequelize from "../db/db.js";
import {
    DataTypes,
} from "sequelize";
import {priorityOptions} from "../const/types/priority.js";
import {statusOptions} from "../const/types/status.js";
import {roleOptions} from "../const/types/role.js";
import {User, Task} from '../const/classes.js';


User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        login: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        name: {type: DataTypes.STRING},
        surname: {type: DataTypes.STRING},
        patron: {type: DataTypes.STRING, comment: 'Отчество'},
        role: {type: DataTypes.ENUM(...roleOptions), defaultValue: roleOptions[1], comment: 'Роль'},
        supervisor: {type: DataTypes.INTEGER, allowNull: true, comment: 'Руководитель (пользователь)'},
    }, {
        sequelize,
        modelName: 'user',
        tableName: 'users',
        getterMethods: {
            fullName() {
                return [this.surname, this.name, this.patron].filter(Boolean).join(' ') || this.login;
            }
        }
    }
);

Task.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, allowNull: false, comment: 'Заголовок'}, // Заголовок
        description: {type: DataTypes.TEXT, allowNull: false, comment: 'Описание'}, // Описание
        end_at: {type: DataTypes.DATE, allowNull: false, comment: 'Дата окончания'}, // Дата окончания
        priority: {type: DataTypes.ENUM(...priorityOptions), defaultValue:  priorityOptions[0], allowNull: false, comment: 'Приоритет'}, // Приоритет
        status: {type: DataTypes.ENUM(...statusOptions), defaultValue: statusOptions[0], allowNull: false, comment: 'Статус'}, // Статус
        creator_id: {type: DataTypes.INTEGER, allowNull: false, comment: 'Создатель'}, // Создатель
        executor_id: {type: DataTypes.INTEGER, allowNull: false, comment: 'Ответственный'}, // Ответственный
    }, {
        sequelize,
        modelName: 'task',
        tableName: 'tasks'
    }
);

User.hasMany(Task, {foreignKey: "creator_id", as: 'createdTasks'})
User.hasMany(Task, {foreignKey: "executor_id", as: 'assignedTasks'})
Task.belongsTo(User, {foreignKey: "creator_id", as: 'creator'})
Task.belongsTo(User, {foreignKey: "executor_id", as: 'executor'})

export {User, Task}