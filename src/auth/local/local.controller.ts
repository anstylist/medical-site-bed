import { Request, Response } from 'express';

import { getUserByEmail, getUserByResetToken, updateUser, updateUserForgotPassword } from '../../api/user/user.service';
import { Patient } from '../../api/patient/patient.types';
import { Admin } from '../../api/admin/admin.types';
import { comparePassword, hashPassword } from '../utils/bcrypt';
import { getTemporaryToken, signToken } from '../auth.service';
import { User } from '../../api/user/user.types';
import { hasTimeExpired } from '../utils/date';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;


  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }


    // JWT
    const payload = {
      id: user.id,
      email: user.email,
    }
    const token = signToken(payload)

    interface Profile {
      fullName: string;
      email: string;
      status: boolean;
      roles: string[]
    };

    const roles = []
    if (user.admin) roles.push('ADMIN')
    if (user.patient) roles.push('PATIENT')
    if (user.doctor) roles.push('DOCTOR')
    if (!roles.length) roles.push('USER')

    const profile: Profile = {
      fullName: user.fullName,
      email: user.email,
      status: user.status,
      roles
    }

    return res.status(200).json({ token, profile })

  } catch (error) { }
}

export async function forgotPasswordHandler(req: Request, res: Response) {

  const { email } = req.body

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = getTemporaryToken()

    const data = {
      forgotPasswordToken: token,
      forgotPasswordTime: new Date()
    }

   const updatedUser = await updateUserForgotPassword(user, data)
  return res.status(200).json({ message: "Reset link sent to email", token, fullName: user.fullName });

  } catch (error) {
    return res.status(500).json({ error })
  }
}



export async function resetPasswordHandler(req: Request, res: Response) {
  
  const { token = "" }: { token?: string } = req.params;
  const { newPassword } = req.body
  

  if (!token) {
    return res.status(404).json({ message: "User not found" });
  }

  try {

    const user = await getUserByResetToken(token)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!hasTimeExpired(user.forgotPasswordTime)) {
      const hashedPassword = await hashPassword(newPassword);

      const data: User = {
        ...user,
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordTime: null
      }

      await updateUser(user.email, data)
      return res.status(200).json({ message: "Your password has been changed successfully" });
    }

    return res.status(401).json({ message: "Your token has expired, try the process again" });

  } catch (error) {
    return res.status(500).json({ error })
  }
}






