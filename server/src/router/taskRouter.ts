import { Router } from 'express';
import { createTask, deleteTask, getTask, updateTask } from '../controller/taskController';
import { authenticate } from '../middleware/authMiddleware';

const taskRouter = Router();

taskRouter.post('/', authenticate, createTask);
taskRouter.get('/', authenticate, getTask);
taskRouter.put('/:id', authenticate, updateTask);
taskRouter.delete('/:id', authenticate, deleteTask);

export default taskRouter;
