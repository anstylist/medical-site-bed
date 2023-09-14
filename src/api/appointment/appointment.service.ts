import { Appointment, Patient, PrismaClient } from "@prisma/client";
import { getPatientByEmail, getPatientById } from "../patient/patient.service";
import { getUserById } from "../user/user.service";
import { getDoctorById } from "../doctor/doctor.service";


const prisma = new PrismaClient();

export async function createAppointmentWithPatient(id: string, patientData: Patient, appointmentData: Appointment) {

  const patient = await getPatientById(id)

  if (!patient) {
    return await prisma.patient.create({
      data: {
        userId: id,
        rh: patientData.rh,
        gender: patientData.gender,
        birthDate: patientData.birthDate,
        phone: patientData.phone,
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
      patientId: patient.id,
      specialityId: appointmentData.specialityId
    }
  })
}

export async function getPatientAppointmentById(id: string) {
  const patient = await getPatientById(id)

  return await prisma.appointment.findMany({
    select: {
      id: true,
      hospital: true,
      reason: true,
      appointmentDataTime: true,
      status: true,
      speciality: {
        select: {
          name: true
        }
      },
      doctor: {
        select: {
          image: true,
          phone: true,
          facebook: true,
          twitter: true,
          linkedin: true,
          instagram: true,
          user: {
            select: {
              fullName: true
            }
          },
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      },
      patient: {
        select: {
          rh: true,
          gender: true,
          birthDate: true,
          phone: true,
          user: {
            select: {
              fullName: true
            }
          }
        }
      }

    },
    where: {
      patientId: patient?.id
    }
  })
}

export async function getDoctorAppointmentsById(id: string) {

  const doctor = await getDoctorById(id)

  return await prisma.appointment.findMany({
    select: {
      id: true,
      hospital: true,
      reason: true,
      appointmentDataTime: true,
      status: true,
      speciality: {
        select: {
          name: true
        }
      },
      doctor: {
        select: {
          image: true,
          phone: true,
          facebook: true,
          twitter: true,
          linkedin: true,
          instagram: true,
          user: {
            select: {
              fullName: true
            }
          },
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      },
      patient: {
        select: {
          rh: true,
          gender: true,
          birthDate: true,
          phone: true,
          user: {
            select: {
              fullName: true
            }
          }
        }
      }

    },
    where: {
      doctorId: doctor?.id
    }
  })
}

export async function getAllAppointments() {
  return await prisma.appointment.findMany({
    select: {
      id: true,
      appointmentDataTime: true,
      hospital: true,
      reason: true,
      status: true,
      speciality: {
        select: {
          name: true
        }
      },
      patient: {
        select: {
          rh: true,
          gender: true,
          birthDate: true,
          phone: true,
          user: {
            select: {
              fullName: true,
              email: true
            }
          }
        }
      },
      doctor: {
        select: {
          image: true,
          phone: true,
          facebook: true,
          twitter: true,
          linkedin: true,
          instagram: true,
          user: {
            select: {
              fullName: true,
              email: true
            }
          },
          specialities: {
            select: {
              speciality: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })
}

enum Status {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}
export async function UpdateStatusAppointment(id: string, status: Status) {
  return prisma.appointment.update({
    where: {
      id
    },
    data: {
      status
    }
  })
}