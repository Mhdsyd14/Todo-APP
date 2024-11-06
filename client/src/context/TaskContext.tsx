import {
  createContext, ReactNode, useCallback, useState,
} from 'react';
import { apiTaskProses } from '../config/index.tsx';
import { TaskProsesResponse } from '../interfaces/TaskProsesResponse.ts';

interface TaskContextType {
    taskProses: TaskProsesResponse |null;
    TaskProsesCreate: (time: Date, task: string) => Promise<void>;
    GetTasksProses: () => Promise<void>;
    DeleteTaskProses: (taskId: number) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [taskProses, setTaskProses] = useState<TaskProsesResponse|null>(null);
  const getToken = () => localStorage.getItem('token');

  const GetTasksProses = useCallback(async () => {
    const token = getToken();
    try {
      const response = await fetch(apiTaskProses, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setTaskProses(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const TaskProsesCreate = async (time: Date, task: string) => {
    const token = getToken();
    try {
      const response = await fetch(apiTaskProses, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ time, task }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      GetTasksProses();
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteTaskProses = async (taskId: number) => {
    const token = getToken();
    try {
      const response = await fetch(`${apiTaskProses}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await GetTasksProses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{
      TaskProsesCreate,
      GetTasksProses,
      DeleteTaskProses,
      taskProses,
    }}
    >
      {children}
    </TaskContext.Provider>
  );
}
