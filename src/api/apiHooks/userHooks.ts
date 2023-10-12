import { LoginParams, LoginResult } from 'models/user';
import { useCreate } from "api/apiHooks";

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>('/admin/auth/login');
};
