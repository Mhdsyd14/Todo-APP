export interface apiResponse<T> {
  message: string;
  user: T;
}

export interface Response {
    id: number;
    email: string;
    username: string;
    iat: number;
    exp: number;
  }

export type UserResponse = apiResponse<Response>;
