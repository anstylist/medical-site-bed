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
  console.log("Request received with email:", email);

  try {
    const user = await getUserByEmail(email)
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = getTemporaryToken()

    const data = {
      forgotPasswordToken: token,
      forgotPasswordTime: new Date()
    }
    console.log(token);

   const updatedUser = await updateUserForgotPassword(user, data)
   console.log(updatedUser);
  return res.status(200).json({ message: "Reset link sent to email", token, fullName: user.fullName });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error })
  }
}



export async function resetPasswordHandler(req: Request, res: Response) {
  console.log('Received reset password request:', req.url);
  
  const { token = "" }: { token?: string } = req.params;
  const { newPassword } = req.body
  
  console.log('Query Parameters:', req.params);

  if (!token) {
    console.log('Token does not exist');
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
      console.log('User ID:', user.id)
      console.log('New Password:', newPassword);

      await updateUser(user.email, data)
      return res.status(200).json({ message: "Your password has been changed successfully" });
    }

    return res.status(401).json({ message: "Your token has expired, try the process again" });

  } catch (error) {
    console.error('Error in resetPasswordHandler:', error)
    return res.status(500).json({ error })
  }
}






