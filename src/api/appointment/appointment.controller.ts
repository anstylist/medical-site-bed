import { Response } from "express";
import { OptionRequest } from "../../auth/auth.types";
import { createAppointmentWithPatient } from "./appointment.service";


export async function createAppointmentWithPatientHandler(req: OptionRequest, res: Response) {

  const { id } = req.user
  const { patientData, appointmentData } = req.body

  try {

    const AppointmentWithPatient = await createAppointmentWithPatient(id, patientData, appointmentData)

    return res.status(200).json({ message: "Appointment created successfully", AppointmentWithPatient })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }

}