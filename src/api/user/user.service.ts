import { PrismaClient } from '@prisma/client';

import { hashPassword } from '../../auth/utils/bcrypt';
import { User, UserForgotPassword } from './user.types';

const prisma = new PrismaClient();

export async function getAllUser() {
  const users = await prisma.user.findMany({
    select: {
      id: false,
      fullName: true,
      email: true,
      status: true,
      doctor: {
        include: {
          specialities: {
            include: {
              speciality: true
            }
          },
          appointments: true
        }
      },
      patient: true,
      admin: true
    }
  });
  return users;
}

export async function createUser(input: User) {
  const hashedPassword = await hashPassword(input.password);

  const data = {
    ...input,
    email: input.email?.toLocaleLowerCase(),
    password: hashedPassword
  }

  const user = await prisma.user.create({
    data
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function getUserByResetToken(forgotPasswordToken: string) {
  const user = await prisma.user.findUnique(
    {
      where: {
        forgotPasswordToken
      }
    }
  )

  return user;
}

export async function getUserByEmail(email: string) {

  const user = await prisma.user.findUnique({
    where: {
      email: email?.toLocaleLowerCase(),
    },
    include: {
      admin: true,
      doctor: {
        include: {
          specialities: {
            include: {
              speciality: true
            }
          },
          appointments: true
        }
      },
      patient: true
    },
  });

  return user;
}

export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
}

export async function updateUser(email: string, data: User) {
  return prisma.user.update({
    where: {
      email: email?.toLocaleLowerCase(),
    },
    data
  });
}

export async function updateUserPassword(user: User, newPassword: string) {
  return prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: newPassword
    }
  });
}

export async function updateUserForgotPassword(user: User, data: UserForgotPassword) {
  return prisma.user.update({
    where: {
      id: user.id,
    },
    data,
  });
}
