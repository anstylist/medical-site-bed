import { Request, Response } from "express";
import { OptionRequest } from "../../auth/auth.types";
import { UpdateStatusAppointment, createAppointmentWithPatient, getAllAppointments, getDoctorAppointmentsById, getPatientAppointmentById } from "./appointment.service";


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

export async function appointmentWithPatientHandler(req: OptionRequest, res: Response) {
  const { id } = req.user
  try {
    const appointment = await getPatientAppointmentById(id)
    return res.status(200).json({ appointment })

  } catch (error) {
    return res.status(500).json({ error })

  }
}

export async function appointmentWithDoctorHandler(req: OptionRequest, res: Response) {
  const { id } = req.user
  try {
    const appointment = await getDoctorAppointmentsById(id)
    return res.status(200).json({ appointment })

  } catch (error) {
    return res.status(500).json({ error })
  }
}

export async function getAllAppointmentsHandler(req: Request, res: Response) {
  try {
    const data = await getAllAppointments()

    const appointments = data.map((_) => {
      return {
        id: _.id,
        appointmentDataTime: _.appointmentDataTime,
        hospital: _.hospital,
        reason: _.reason,
        status: _.status,
        speciality: _.speciality.name,
        patient: {
          fullName: _.patient.user.fullName,
          email: _.patient.user.email,
          rh: _.patient.rh,
          gender: _.patient.gender,
          phone: _.patient.phone,
          birthDate: _.patient.birthDate
        },
        doctor: {
          fullName: _.doctor.user.fullName,
          email: _.doctor.user.email,
          image: _.doctor.image,
          phone: _.doctor.phone,
          specialities: [] = _.doctor.specialities.map((_) => {
            return _.speciality.name
          }),
          socialLinks: [
            {
              type: "facebook",
              url: _.doctor.facebook
            },
            {
              type: "twitter",
              url: _.doctor.twitter
            },
            {
              type: "linkedin",
              url: _.doctor.linkedin
            },
            {
              type: "instagram",
              url: _.doctor.instagram
            }
          ]
        }
      }
    })

    return res.status(200).json(appointments)
  } catch (error) {
    return res.status(500).json({ error })
  }

}

export async function UpdateStatusAppointmentHandler(req: Request, res: Response) {
  const id = req.params.id
  const { status } = req.body
  try {
    await UpdateStatusAppointment(id, status)
    return res.status(200).json({ message: "Appointment updated successfully" })
  } catch (error) {
    return res.status(500).json({ error })
  }
}