export interface IRegisterResponse {
    status?: number;
    message?: string;
    data?: { username: string; email: string };
    error?: string;
    token?:string;
  }
  