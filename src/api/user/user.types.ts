import { User as UserModel } from '@prisma/client';

export type User = UserModel;

export type UserForgotPassword = {
  forgotPasswordToken: string;
  forgotPasswordTime: Date;
};




