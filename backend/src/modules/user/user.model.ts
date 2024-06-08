import { prop } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from 'src/transformers/model.transformer';

export class User {
  @prop({ required: true, trim: true })
  fullName: string;

  @prop({ required: true })
  email: string;

  @prop({ required: false, select: false, default: '' })
  password: string;

  @prop({
    type: Date,
    required: false,
  })
  emailVerifiedAt?: Date;

  @prop({
    required: false,
  })
  OTPExpireAt?: number;

  @prop({ required: false })
  OTP: number;
}

export const UserProvider = getProviderByTypegooseClass(User);
