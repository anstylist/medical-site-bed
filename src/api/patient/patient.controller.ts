import { Request, Response } from 'express';
import { AuthRequest, OptionRequest } from '../../auth/auth.types';
import { getAllPatients, getPatientById, updatePatient } from './patient.service';
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

export async function getPatientSingle(req: OptionRequest, res: Response) {
  const { id } = req.user

  try {
    const patient = await getPatientById(id)
    res.status(200).json(patient)
  } catch (error) {
    res.status(404).json(error)
  }
}

export async function getAllPatientsHandler(req: Request, res: Response) {
  try {
    const data = await getAllPatients()

    const patients = data.map((item) => {
      return {
        fullName: item.user.fullName,
        email: item.user.email,
        status: item.user.status,
        birthDate: item.birthDate,
        gender: item.gender,
        rh: item.rh,
        phone: item.phone,
        country: item.country.name
      }
    })
    res.status(200).json(patients)
  } catch (error) {
    res.status(404).json(error)
  }
}