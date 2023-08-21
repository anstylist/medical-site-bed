import { PrismaClient } from "@prisma/client";
import { Doctor } from "./doctor.types";

const prisma = new PrismaClient();


export async function getDoctorAppintmentByID(id: string) {
  const doctorAppointments = await prisma.appointment.findMany({
    select: {
      id: true,
      appointmentDataTime: true,
      hospital: true,
      reason: true,
      status: true,
      patient: true
    },
    where: {
      doctorId: id,
    },
  });

  return doctorAppointments
}

export async function createDoctor(input: Doctor) {



}

