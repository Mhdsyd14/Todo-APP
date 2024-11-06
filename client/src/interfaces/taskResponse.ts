import { apiResponse } from './apiResponse.ts';

export interface Task {
  id: number;
  todo: string;
  userId: number | null;
}

export type ICreateTaskResponse = apiResponse<Task>;
export type IGetTasksResponse = apiResponse<Task[]>;
export type IUpdateTaskResponse = apiResponse<Task>;
export type IDeleteTaskResponse = apiResponse<{ id: number }>;
