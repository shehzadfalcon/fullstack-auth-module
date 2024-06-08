import { IAuthUser } from './auth-user.interface';

export interface ILogin {
  user?: IAuthUser;
  token?: string;
}
