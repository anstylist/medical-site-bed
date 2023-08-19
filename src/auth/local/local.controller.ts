import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { getUserByEmail } from '../../api/user/user.service';
import { Patient } from '../../api/patient/patient.types';
import { Doctor } from '../../api/doctor/doctor.types';
import { Admin } from '../../api/admin/admin.types';
import { comparePassword } from '../utils/bcrypt';
import { signToken } from '../auth.service';

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
      doctor?: Doctor;
      admin?: Admin;
      patient?: Patient
    };

    const profile: Profile = {
      fullName: user.fullName,
      email: user.email,
      status: user.status
    }

    if (user.admin) {
      profile.admin = user.admin as Admin;
    }
    else if (user.doctor) {
      profile.doctor = user.doctor;
    }
    else {
      profile.patient = user.patient as Patient;
    }

    return res.status(200).json({ token, profile })

  } catch (error) { }
}