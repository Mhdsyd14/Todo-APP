import { number, object, string } from 'yup';

export const createTaskSchema = object({
  todo: string()
    .min(4, 'Todo must be at least 4 characters')
    .max(60, 'Todo must be at most 60 characters')
    .required('Todo is required'),
  userId: number().required('User ID is required'),
});

export const updateTaskSchema = object({
  todo: string()
    .min(4, 'Todo must be at least 4 characters')
    .max(60, 'Todo must be at most 60 characters')
    .required('Todo is required'),
});

export const registerSchema = object({
  username: string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
  email: string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must be at most 30 characters')
    .required('Password is required'),
});

export const loginSchema = object({
  email: string()
    .email('Must be a valid email')
    .required('Email is required'),
  password: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
