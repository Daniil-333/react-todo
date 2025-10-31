import {Task, User} from "../models/models.ts";
import ApiError from "../error/ApiError.ts";

class TodoController {
    async create(req, res, next) {
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

        const data = {title, description, end_at, creator_id: user.id, executor_id};

        const task = await Task.create(data)

        return res.json(task)
    }

    async update(req, res, next) {
        const {id} = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return next(ApiError.badRequest('Задача не найдена'));
        }

        await task.update(req.body);

        return res.json(task);
    }

    async getAll(req, res) {
        const items = await Task.findAll({
            include: [{
                model: User,
                as: "executor",
                attributes: ['id', 'login', 'name', 'surname', 'patron' ,'fullName']
            }],
            order: [['end_at', 'ASC']],
        });
        return res.json(items);
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        const item = await Task.findByPk(id);

        if (!item) {
            return next(ApiError.badRequest('Задача не найдена'));
        }

        return res.json(item);
    }
}

export default new TodoController();