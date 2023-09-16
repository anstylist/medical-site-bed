import { PrismaClient } from "@prisma/client";
import { Doctor } from "./doctor.types";
import { User } from "../user/user.types";
import { hashPassword } from "../../auth/utils/bcrypt";
import { getSpecialityByName } from "../speciality/speciality.service";
import uploadFile from "../../utils/uploadFile";

const prisma = new PrismaClient();

export async function getDoctorById(id: string) {
  return await prisma.doctor.findFirst({
    where: {
      user: {
        id: id
      }
    }
  })
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



export async function createDoctor(userData: User, doctorData: Doctor, specialitiesNames: string[], file?: Express.Multer.File) {

  const specialities = []
  let fileResponse = null
  let filePath = file?.path || ''

  if (!filePath) {
    throw new Error('File is required')
  }

  try {
    fileResponse = await uploadFile('doctors', filePath)
  } catch (error) {
    throw error
  }

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
          image: fileResponse.secure_url,
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

export async function updateDoctor(id: string, doctorData: Doctor, specialitiesNames: string[], file?: Express.Multer.File) {

  const specialities = []
  let fileResponse = null
  let filePath = file?.path || ''

  if (filePath) {
    try {
      fileResponse = await uploadFile('doctors', filePath)
    } catch (error) {
      throw error
    }
  }

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

  // Actualiza las especialidades del médico eliminando las anteriores y agregando las nuevas
  await prisma.specialityDoctor.deleteMany({
    where: {
      doctorId: id,
    },
  });

  for (const especialidad of specialities) {
    await prisma.specialityDoctor.create({
      data: {
        doctorId: id,
        specialityId: especialidad.specialityId,
      },
    });
  }


  const dataToUpdate = {
    phone: doctorData.phone,
    facebook: doctorData.facebook,
    twitter: doctorData.twitter,
    linkedin: doctorData.linkedin,
    instagram: doctorData.instagram,
    ...(fileResponse && { image: fileResponse.secure_url })
  };

  const doctor = await prisma.doctor.update({
    where: {
      id: id
    },
    data: dataToUpdate
  })

  return doctor
}



