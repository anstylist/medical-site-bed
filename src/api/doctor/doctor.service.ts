import { PrismaClient } from "@prisma/client";
import { Doctor } from "./doctor.types";
import { User } from "../user/user.types";
import { hashPassword } from "../../auth/utils/bcrypt";
import { getSpecialityByName } from "../speciality/speciality.service";

const prisma = new PrismaClient();


export async function getDoctorAppintmentByID(id: string) {
  const doctorAppointments = await prisma.appointment.findMany({
    select: {
      id: true,
      appointmentDataTime: true,
      hospital: true,
      reason: true,
      status: true,
      patient: true,
      doctor: true,
    },
    where: {
      doctorId: id,
    },
  });

  return doctorAppointments
}

export async function getAllDoctor() {
  const doctors = await prisma.doctor.findMany({
    select: {
      id: true,
      phone: true,
      image: true,
      facebook: true,
      twitter: true,
      linkedin: true,
      instagram: true,
      specialities: {
        select: {
          speciality: {
            select: {
              name: true
            }
          }
        }
      },
      user: {
        select: {
          fullName: true,
          email: true
        }
      }
    }
  })
  return doctors
}

export async function getAllDoctorAdmin() {
  const doctors = await prisma.doctor.findMany({
    select: {
      id: true,
      phone: true,
      image: true,
      facebook: true,
      twitter: true,
      linkedin: true,
      instagram: true,
      specialities: {
        select: {
          speciality: {
            select: {
              name: true
            }
          }
        }
      },
      user: {
        select: {
          fullName: true,
          email: true,
          password: true,
          status: true
        }
      }
    }
  })
  return doctors
}

export async function getAllDoctorBySpeciality(specialityName: string) {

  const speciality = await getSpecialityByName(specialityName)

  if (!speciality) {
    throw new Error(`No se encontró la especialidad "${specialityName}".`);
  }

  const doctors = await prisma.doctor.findMany({
    select: {
      id: true,
      specialities: {
        select: {
          speciality: true
        }
      },
      user: {
        select: {
          fullName: true,
        }
      },
    },
    where: {
      specialities: {
        every: {
          specialityId: {
            equals: speciality.id
          }
        }
      }
    }
  })

  return doctors

}



export async function createDoctor(userData: User, doctorData: Doctor, specialitiesNames: string[]) {

  const specialities = []

  for (const specialityName of specialitiesNames) {
    const speciality = await prisma.speciality.findUnique({
      select: {
        id: true
      },
      where: {
        name: specialityName,
      },
    });

    if (!speciality) {
      throw new Error(`No se encontró la especialidad "${specialityName}".`);
    }

    specialities.push({ specialityId: speciality.id });
  }

  const hashedPassword = await hashPassword(userData.password);

  const doctorUser = await prisma.user.create({
    data: {
      fullName: userData.fullName,
      email: userData.email,
      password: hashedPassword,
      doctor: {
        create: {
          image: doctorData.image,
          phone: doctorData.phone,
          facebook: doctorData.facebook,
          twitter: doctorData.twitter,
          linkedin: doctorData.linkedin,
          instagram: doctorData.instagram,
          specialities: {
            create: specialities
          }
        }
      }
    },
    include: {
      doctor: {
        include: {
          specialities: {
            select: {
              speciality: true
            }
          }
        }
      }
    }
  })
  return doctorUser
}

export async function updateDoctor(id: string, data: Doctor) {

  const doctor = await prisma.doctor.update({
    where: {
      id: id
    },
    data
  })

  return doctor
}



