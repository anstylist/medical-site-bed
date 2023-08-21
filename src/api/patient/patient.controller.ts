import { Request, Response } from 'express';
import { OptionRequest } from '../../auth/auth.types';
import { getPatientAppintmentByID, updatePatient } from './patient.service';
import { Patient } from '@prisma/client';

export async function updatePatientHandler(req: OptionRequest, res: Response) {

  const { patient: { id: patientID } } = req.user
  const data = req.body

  try {
    if (!patientID) {
      return res.status(401).send('You are not patient');
    }

    await updatePatient(patientID, data)

    res.status(200).json({ message: "successfully upgraded" })

  } catch (error) {
    res.status(500).json({ error })
  }
}

export async function getPatientAppointmentByIDHandler(req: OptionRequest, res: Response) {

  const { patient: { id: patientID } } = req.user

  try {

    if (!patientID) {
      return res.status(401).send('You are not patient');
    }

    const patientAppointment = await getPatientAppintmentByID(patientID)

    res.status(200).json({ patientAppointment })

  } catch (error) {
    res.status(500).json({ error })
  }
}