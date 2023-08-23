import { PrismaClient } from '@prisma/client';
import { Speciality } from './speciality.types';

const prisma = new PrismaClient();

export async function createSpeciality(data: Speciality) {
  return await prisma.speciality.create({
    data
  })
}

export async function getAllSpeciality() {
  return await prisma.speciality.findMany({
    select: {
      id: true,
      name: true
    }
  })
}

export async function getSpecialityByName(specialityName: string) {
  return await prisma.speciality.findUnique({
    where: {
      name: specialityName
    }
  })
}

export async function deleteSpeciality(id: string) {
  return await prisma.speciality.delete({
    where: {
      id
    }
  })
}

export async function updateSpeciality(data: Speciality) {
  return await prisma.speciality.update({
    where: {
      id: data.id
    },
    data
  })
}