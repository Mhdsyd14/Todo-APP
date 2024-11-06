import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
    errors?: string[]; 
}

const errorHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(err.errors && { errors: err.errors }), 
  });
};

export default errorHandler;
