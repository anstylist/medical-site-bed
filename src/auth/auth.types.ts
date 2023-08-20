import { Request } from 'express';

import { User } from '../api/user/user.types';
import { Doctor } from '../api/doctor/doctor.types';
import { Patient } from '@prisma/client';
import { Admin } from '../api/admin/admin.types';

export type PayloadType = {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: User
}

export interface OptionRequest extends Request {
  user?: any
}
