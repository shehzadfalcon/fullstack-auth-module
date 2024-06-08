export interface IAuthUser {
  _id: string;
  email: string;
  fullName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
}
