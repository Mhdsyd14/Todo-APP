export interface TaskProsesResponse {
    message: string;
    data: {
      id: number;
      time: string;
      task: string;
    }[];
  }
