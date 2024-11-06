import { Request } from 'express';
export interface Date extends Request {
  time?: string 
}