export type TLoginUser = {
  id: string;
  password: string;
};

export interface TRegisterUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
