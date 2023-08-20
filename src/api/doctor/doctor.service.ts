import { PrismaClient } from "@prisma/client";

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
      doctor: true
    },
    where: {
      doctorId: id,
    },
  });

  return doctorAppointments
}

