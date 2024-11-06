import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidator';
import { ValidationError } from 'yup';
import { 
  ICreateTaskResponse, 
  IGetTasksResponse, 
  IUpdateTaskResponse, 
  IDeleteTaskResponse 
} from '../interface/taskResponse'; 
import { CustomError } from '../interface/error';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response<ICreateTaskResponse>,
  next: NextFunction)
: Promise<void> => {
  try {
    await createTaskSchema.validate(req.body, { abortEarly: false });

    const { todo, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return next({
        statusCode: 400,
        message: 'Invalid userId. User does not exist.',
      });
    }

    const newTask = await prisma.task.create({
      data: {
        todo,
        userId,
      },
    });

    res.status(201).json({
      message: 'Tasks successfully created',
      data: newTask,
    });
  } catch (error) {
    const err = error as CustomError;
    if (err instanceof ValidationError) {
      return next({
        statusCode: 400,
        message: 'Validation error',
        errors: err.message,
      });
    }
    return next({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const getTask = async (req: Request, res: Response<IGetTasksResponse>, next: NextFunction)
: Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({
      message: 'Successfully retrieved tasks',
      data: tasks, 
    });
  } catch (error) {

    const err = error as CustomError;
 
    return next({
      statusCode: 500,
      message: 'Failed to retrieve tasks',
      error: err.message,
    });
  }
};

export const updateTask = async (req: Request, res: Response<IUpdateTaskResponse>,
  next: NextFunction)
: Promise<void> => {
  const { id } = req.params;

  try {
    await updateTaskSchema.validate(req.body, { abortEarly: false });
    const { todo } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { todo },
    });

    res.status(200).json({
      message: 'Successfully updated tasks',
      data: updatedTask,
    });
  } catch (error) {
    const err = error as CustomError;
    if (err instanceof ValidationError) {
      return next({
        statusCode: 400,
        message: 'Validation error',
        errors: err.message,
      });
    }

    if (err.code === 'P2025') {

      return next({
        statusCode: 404,
        message: 'Tasks not found',
      });
    }
    return next({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

export const deleteTask = async (req: Request, res: Response<IDeleteTaskResponse>,
  next: NextFunction)
: Promise<void> => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: 'Successfully deleted tasks',
      data: { id: deletedTask.id },
    });
  } catch (error) {
    const err = error as CustomError;
    if (err.code === 'P2025') {
      return next({
        statusCode: 404,
        message: 'Tasks not found',
      });
    }
    return next({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};
