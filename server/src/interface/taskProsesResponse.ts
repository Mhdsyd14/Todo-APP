import { apiResponse } from './apiResponse';

export interface taskProses {
  id: number;
  time: Date;
  task: string;
}

export type CreateTaskResponse = apiResponse<taskProses>;
export type GetTasksResponse = apiResponse<taskProses[]>;
export type DeleteTaskResponse = apiResponse<{ id: number }>;

