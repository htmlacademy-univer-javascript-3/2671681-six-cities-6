import { User } from './user';

export type AuthInfo = User & {
  email: string;
  token: string;
};
