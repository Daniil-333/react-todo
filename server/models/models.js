import sequelize from "../db/db.js";
import DataTypes from "sequelize";

const PriorityVariant = ['low', 'medium', 'high']

const TodoStatus = ['created', 'progress', 'complete', 'cancel']

export const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    patron: {type: DataTypes.STRING, comment: 'Отчество'},
    role: {type: DataTypes.STRING, defaultValue: 'USER', comment: 'Роль'},
    supervisor: {type: DataTypes.INTEGER, allowNull: true, comment: 'Руководитель (пользователь)'},
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return [this.surname, this.name, this.patron].filter(Boolean).join(' ') || this.login;
        }
    }
})

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