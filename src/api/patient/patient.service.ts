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

export async function getAllPatients() {
  return prisma.patient.findMany({
    select: {
      id: true,
      rh: true,
      gender: true,
      birthDate: true,
      phone: true,
      country: {
        select: {
          name: true
        }
      },
      user: {
        select: {
          fullName: true,
          email: true,
          password: true,
          status: true
        },
      }
    }
  })

}