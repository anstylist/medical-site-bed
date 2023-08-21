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
      doctor?: any;
      admin?: Admin;
      patient?: Patient
    };

    const profile: Profile = {
      fullName: user.fullName,
      email: user.email,
      status: user.status
    }

    if (user.admin) {
      profile.admin = user.admin;
    }
    else if (user.doctor) {
      profile.doctor = {
        image: user.doctor.image,
        phone: user.doctor.phone,
        socialLinks: [
          {
            "type": "facebook",
            "url": user.doctor.facebook,
          },
          {
            "type": "instagram",
            "url": user.doctor.instagram
          },
          {
            "type": "twitter",
            "url": user.doctor.twitter
          },
          {
            "type": "linkedin",
            "url": user.doctor.linkdein
          }
        ],
        specialities: [] =
          user.doctor.specialities.map((item) => {
            return item.speciality.name
          })
        ,
        appointments: [] = user.doctor.appointments
      }
    }
    else if (user.patient) {
      profile.patient = user.patient;
    }

    return res.status(200).json({ token, profile })

  } catch (error) { }
}

export async function forgotPasswordHandler(req: Request, res: Response) {

  const { email } = req.body
  console.log(email)

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

    await updateUserForgotPassword(user, data)

    return res.status(200).json({ message: `An email with a link to reset your password was already sent` })

  } catch (error) {
    return res.status(500).json({ error })
  }
}



export async function resetPasswordHandler(req: Request, res: Response) {

  const { token = "" }: { token?: string } = req.query;
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

      await updateUser(data.id, data)
      return res.status(200).json({ message: "Your password has been changed successfully" });
    }

    return res.status(401).json({ message: "Your token has expired, try the process again" });

  } catch (error) {
    return res.status(500).json({ error })
  }
}






