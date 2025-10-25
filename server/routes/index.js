import Router from 'express';
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import todoRouter from "./todoRouter.js";

const router = new Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);
router.use('/tasks', todoRouter);

export default router;