import { Appointment, Patient, PrismaClient } from "@prisma/client";
import { getPatientByEmail, getPatientById } from "../patient/patient.service";


const prisma = new PrismaClient();

export async function createAppointmentWithPatient(id: string, patientData: Patient, appointmentData: Appointment) {

  const patient = await getPatientById(id)

  if (!patient) {
    return await prisma.patient.create({
      data: {
        rh: patientData.rh,
        gender: patientData.gender,
        birthDate: patientData.birthDate,
        phone: patientData.phone,
        userId: id,
        countryId: patientData.countryId,
        appointments: {
          create: appointmentData
        }
      },
      include: {
        appointments: true
      }
    })
  }

  return await prisma.appointment.create({
    data: {
      appointmentDataTime: appointmentData.appointmentDataTime,
      hospital: appointmentData.hospital,
      reason: appointmentData.reason,
      status: appointmentData.status,
      doctorId: appointmentData.doctorId,
      patientId: patient.id
    }
  })
}
