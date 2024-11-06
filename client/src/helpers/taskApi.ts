import { baseUrl } from '../config/index.tsx';
import { ICreateTaskResponse, IGetTasksResponse, IUpdateTaskResponse } from '../interfaces/taskResponse.ts';

const getToken = () => localStorage.getItem('token');

export const getTasks = async (): Promise<IGetTasksResponse> => {
  const response = await fetch(`${baseUrl}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch response status: ${response.statusText}`);
  }
  return response.json();
};

export const createTask = async (taskData: { todo: string; userId: number | undefined })
: Promise<ICreateTaskResponse> => {
  const response = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async (id: number, todo: string): Promise<IUpdateTaskResponse> => {
  const response = await fetch(`${baseUrl}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ todo }),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task with ID: ${id}`);
  }
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task with ID: ${id}`);
  }
};
