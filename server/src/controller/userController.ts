import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';
import { IRegisterResponse } from '../interface/registerResponse'; 
import { registerSchema, loginSchema } from '../validators/taskValidator';
import { CustomError } from '../interface/error';
import { ValidationError } from 'yup';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response<IRegisterResponse>,
  next: NextFunction): Promise<void> => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });
    
    const { username, email, password } = req.body;

    const checkUsername = await prisma.user.findUnique({
      where: { username },
    });

    const checkEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (checkUsername) {
      return next({
        statusCode: 400,
        message: 'Username already exists',
      });
    }

    if (checkEmail) {
      return next({
        statusCode: 400,
        message: 'Email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: 201,
      message: 'Register Successful',
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    const err = error as CustomError;
    if (err instanceof ValidationError) {
      return next({
        statusCode: 400,
        message: 'Validation error',
        errors: err.errors,
      });
    }
    console.error(error);
    next({
      statusCode: 500,
      message: 'Failed to register user.',
    });
  }
};

export const login = async (req: Request, res: Response<IRegisterResponse>,
  next: NextFunction): Promise<void> => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return next({
        statusCode: 401,
        message: 'Invalid email or password',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    
    if (!match) {
      return next({
        statusCode: 401,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.json({
      message: 'Login Successful',
      token,
    });
  } catch (error) {
    const err = error as CustomError;
    if (err instanceof ValidationError) {
      return next({
        statusCode: 400,
        message: 'Validation error',
        errors: err.errors,
      });
    }
    console.error(error);
    next({
      statusCode: 500,
      message: 'Failed to login user.',
    });
  }
};
