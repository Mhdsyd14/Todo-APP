import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { TaskProvider } from './context/TaskContext.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <TaskProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TaskProvider>
  </AuthProvider>,
);
