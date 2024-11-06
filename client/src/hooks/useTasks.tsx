import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext.tsx';

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
