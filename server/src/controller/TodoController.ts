import {RequestHandler} from "express";
import {Task, User} from "../models/models.js";
import ApiError from "../error/ApiError.js";


class TodoController {
    create: RequestHandler = async (req, res, next) => {
        let {
            title,
            description,
            end_at,
            priority,
            status,
            user,
            executor_id,
        } = req.body;

        if(!title || !description || !end_at || !priority || !status || !user.id || !executor_id) {
            return next(ApiError.badRequest("Поля 'Заголовок', 'Описание', 'Дата окончания', 'Приоритет', 'Статус' 'Создатель', 'Ответственный' обязательны к заполнению"));
        }

        const data = {title, description, end_at, creator_id: user.id, executor_id} as Task;

        const task = await Task.create(data)

        return res.json(task)
    }

    update: RequestHandler = async (req, res, next)=>  {
        const {id} = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return next(ApiError.badRequest('Задача не найдена'));
        }

        await task.update(req.body);

        return res.json(task);
    }

    getAll: RequestHandler = async (req, res) => {
        const items = await Task.findAll({
            include: [{
                model: User,
                as: "executor",
                attributes: ['id', 'login', 'name', 'surname', 'patron']
            }],
            order: [['end_at', 'ASC']],
        });

        const result = items.map(task => {
            const taskData = task.toJSON();
            if (taskData.executor) {
                taskData.executor.fullName = [
                    taskData.executor.surname,
                    taskData.executor.name,
                    taskData.executor.patron
                ].filter(Boolean).join(' ') as string || taskData.executor.login;
            }
            return taskData;
        });

        return res.json(result);
    }

    getOne: RequestHandler = async (req, res, next) => {
        const {id} = req.params;
        const item = await Task.findByPk(id);

        if (!item) {
            return next(ApiError.badRequest('Задача не найдена'));
        }

        return res.json(item);
    }
}

export default new TodoController();