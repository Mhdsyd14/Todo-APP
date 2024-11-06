import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateTaskResponse, GetTasksResponse,DeleteTaskResponse }
  from '../interface/taskProsesResponse';
import { CustomError } from '../interface/error';

const prisma = new PrismaClient();

export const CreateProsesTask = async (req:Request, res:Response<CreateTaskResponse>,
  next:NextFunction): Promise<void> => {
  try {
    const { time, task } = req.body;
    const taskProses = await prisma.taskProses.create({
      data:{ time,task }
    });
    res.status(201).json({
      message: 'Tasks proses successfully created',
      data: taskProses,
    });
  } catch (error) {
    const err = error as CustomError;
    return next({
      statusCode: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

export const GetProsesTask = async (req:Request, res:Response<GetTasksResponse>,
  next:NextFunction): Promise<void> => {
  try {
    const taskProses = await prisma.taskProses.findMany();
    res.status(200).json({
      message: 'Successfully retrieved tasks proses',
      data: taskProses, 
    });
  } catch (error) {
    const err = error as CustomError;
    return next({
      statusCode: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

export const DeleteProsesTask = async (req:Request, res:Response<DeleteTaskResponse>,
  next:NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const deleteProsesTask = await prisma.taskProses.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({
      message: 'Successfully deleted tasks proses',
      data: { id: deleteProsesTask.id },
    });
  } catch (error) {
    const err = error as CustomError;
    return next({
      statusCode: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};