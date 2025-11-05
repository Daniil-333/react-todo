import {Router} from 'express';
import authRouter from "./authRouter.ts";
import userRouter from "./userRouter.ts";
import todoRouter from "./todoRouter.ts";

const router = Router();

router.use('/auth', authRouter);

router.use('/users', userRouter);
router.use('/tasks', todoRouter);

export default router;