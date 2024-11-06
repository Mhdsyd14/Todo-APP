import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { CreateProsesTask,DeleteProsesTask,GetProsesTask }
  from '../controller/taskProsesController';

const taskProsesRouter = Router();

taskProsesRouter.post('/',authenticate,CreateProsesTask);
taskProsesRouter.get('/',authenticate,GetProsesTask);
taskProsesRouter.delete('/:id',authenticate,DeleteProsesTask);

export default taskProsesRouter;