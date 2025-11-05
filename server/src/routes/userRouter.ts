import {Router} from 'express';
import UserController from '../controller/UserController.ts';
import AuthMiddleware from '../middleware/AuthMiddleware.ts';

const router = Router();

router.get('/', AuthMiddleware, UserController.getAll);

export default router;