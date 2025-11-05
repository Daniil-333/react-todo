import {Router} from 'express';
import TodoController from "../controller/TodoController.ts";
import CheckRoleMiddleware from "../middleware/CheckRoleMiddleware.ts";

const router = Router();

router.get('/', TodoController.getAll);
router.get('/:id', TodoController.getOne);
router.post('/', CheckRoleMiddleware('ADMIN'), TodoController.create);
router.put('/:id', TodoController.update);

export default router;