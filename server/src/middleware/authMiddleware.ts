import { NextFunction,  Response } from 'express';
import jwt from 'jsonwebtoken';
import { user } from '../interface/user';

export const authenticate = (req: user, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    res.status(403).json({
      error: 'Token is required'
    });
    return; 
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
    if (err) {
      res.status(401).json({
        error: 'Invalid token'
      });
      return; 
    }
    req.user = decoded;
    next(); 
  });
};
