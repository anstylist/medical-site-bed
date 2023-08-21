import { Patient, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function updatePatient(id: string, data: Patient) {
  return prisma.patient.update({
    where: {
      id: data.id
    },
    data
  })
}

export async function getPatientByEmail(email: string) {
  return prisma.patient.findFirst({
    where: {
      user: {
        email: email
      }
    }
  })
}

export async function getPatientById(id: string) {
  return prisma.patient.findFirst({
    where: {
      user: {
        id: id
      }
    }
  })
}

export async function getPatientAppintmentByID(id: string) {
  const doctorAppointments = await prisma.appointment.findMany({
    select: {
      id: true,
      appointmentDataTime: true,
      hospital: true,
      reason: true,
      status: true,
      patient: {
        include: {
          user: {
            select: {
              fullName: true,
              email: true
            }
          }
        }
      },
      doctor: {
        include: {
          user: {
            select: {
              fullName: true,
              email: true
            }
          }
        }
      }
    },
    where: {
      patientId: id
    },
  });

  return doctorAppointments
}