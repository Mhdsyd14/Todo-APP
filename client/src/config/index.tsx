const apiUrl = import.meta.env.VITE_API;

export const baseUrl = apiUrl;
export const apiRegister = `${baseUrl}/api/users/register`;
export const apiLogin = `${baseUrl}/api/users/login`;
export const apiTaskProses = `${baseUrl}/api/tasks-proses`;
