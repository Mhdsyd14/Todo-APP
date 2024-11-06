import { createContext, useState, ReactNode } from 'react';
import { apiRegister, apiLogin } from '../config/index.tsx';

interface AuthContextType {
    message: string;
    loading: boolean;
    succesRegister: boolean;
    succesLogin: boolean;
    register: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }:AuthProviderProps) {
  const [message, setMessage] = useState<string>('');
  const [succesRegister, setSuccesRegister] = useState<boolean>(false);
  const [succesLogin, setSuccesLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (username:string, email:string, password:string) => {
    setLoading(false);
    setSuccesRegister(false);
    try {
      const response = await fetch(apiRegister, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok === true) {
        setMessage(data.message);
        setSuccesRegister(true);
      } else {
        setMessage(data.message);
        setSuccesRegister(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccesRegister(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email:string, password:string) => {
    setLoading(true);
    setSuccesLogin(false);
    try {
      const response = await fetch(apiLogin, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok === true) {
        setMessage(data.message);
        localStorage.setItem('token', data.token);
        setSuccesLogin(true);
      } else {
        setMessage(data.message);
        setSuccesLogin(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccesLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setMessage('');
    setSuccesLogin(false);
    setSuccesRegister(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      loading, register, message, login, succesRegister, succesLogin, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
