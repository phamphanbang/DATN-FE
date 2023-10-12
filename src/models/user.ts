export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  name: string;
}