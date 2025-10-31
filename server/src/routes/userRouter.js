import Router from 'express';
import UserController from '../controller/UserController.js';
import AuthMiddleware from '../middleware/AuthMiddleware';

const router = new Router();

router.get('/', AuthMiddleware, UserController.getAll);

export default router;