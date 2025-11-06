import {Router} from 'express';
import AuthController from '../controller/AuthController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const router = Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.get('/check', AuthMiddleware, AuthController.check);

export default router;