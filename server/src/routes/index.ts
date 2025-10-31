import {Router} from 'express';
import authRouter from "./authRouter";
import userRouter from "./userRouter.js";
import todoRouter from "./todoRouter.js";

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);
router.use('/tasks', todoRouter);

export default router;