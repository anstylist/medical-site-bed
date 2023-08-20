import { Request, Response } from 'express';
import { OptionRequest } from '../../auth/auth.types';
import { getDoctorAppintmentByID } from './doctor.service';

export async function getDoctorAppointmentsHandler(req: OptionRequest, res: Response) {

  try {
    const { doctor } = req.user
    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    const doctorAppointments = await getDoctorAppintmentByID(doctor.id)
    res.status(200).json(doctorAppointments);
  } catch (error) {
    console.error('Error al obtener las citas del doctor:', error);
    res.status(500).json({ error: 'Hubo un error al obtener las citas del doctor.' });
  }
}