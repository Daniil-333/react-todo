import {Router} from 'express';
import TodoController from "../controller/TodoController.js";
import CheckRoleMiddleware from "../middleware/CheckRoleMiddleware.js";

const router = Router();

router.get('/', TodoController.getAll);
router.get('/:id', TodoController.getOne);
router.post('/', CheckRoleMiddleware('ADMIN'), TodoController.create);
router.put('/:id', TodoController.update);

export default router;