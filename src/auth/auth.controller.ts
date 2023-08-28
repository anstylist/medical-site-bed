import { Response, NextFunction } from 'express';
//import { compose } from 'compose-middleware';

import { getUserByEmail } from '../api/user/user.service';
import { AuthRequest } from './auth.types';
import { User } from '../api/user/user.types';
import { verifyToken } from './auth.service';

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // [Bearer, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9]
  // const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  const token = req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Verify token
  const decoded = verifyToken(token)
  //const decoded = { id: '123', email: 'test'}

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUserByEmail(decoded.email) as User

  req.user = user
  return next();
}

// closure -> Es una función que retorna otra

export const hasRole = (allowRoles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    const user = req.user as any
    let userRoles: string[] = []

    if (user.admin) {
      userRoles?.push('ADMIN');
    }
    if (user.doctor) {
      userRoles?.push('DOCTOR');
    }
    if (user.patient) {
      userRoles?.push('PATIENT');
    }

    if (!userRoles.length) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const hasPermission = userRoles.some(role => allowRoles.includes(role));


    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next()
  }
}