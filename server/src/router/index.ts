import { Router } from 'express';
import userRouter from './userRoutes';
import taskRouter from './taskRouter';
import taskProsesRouter from './taskProsesRouter';

const router = Router();

router.use('/users',userRouter);
router.use('/tasks',taskRouter);
router.use('/tasks-proses',taskProsesRouter);

export default router;