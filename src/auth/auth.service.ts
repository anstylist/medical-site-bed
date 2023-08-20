import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import { PayloadType } from './auth.types';

const SECRET = process.env.JWT_SECRET as string

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, SECRET) as PayloadType

  return decoded
}

export const signToken = (payload: PayloadType) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: '1d' })
  return token
}

export const getTemporaryToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  return resetToken
}