import { Request, Response } from 'express';
import { OptionRequest } from '../../auth/auth.types';
import { createDoctor, getAllDoctor, getAllDoctorAdmin, getAllDoctorBySpeciality, updateDoctor } from './doctor.service';


export async function getAllDoctorHandler(req: Request, res: Response) {
  try {
    const data = await getAllDoctor()

    const doctors = data.map((item) => {
      return {
        id: item.id,
        fullName: item.user.fullName,
        email: item.user.email,
        image: item.image,
        phone: item.phone,
        specialities: [] =
          item.specialities.map((item) => {
            return item.speciality.name
          }),
        socialLinks: [
          {
            type: "facebook",
            url: item.facebook
          },
          {
            type: "twitter",
            url: item.twitter
          },
          {
            type: "linkedin",
            url: item.linkedin
          },
          {
            type: "instagram",
            url: item.instagram
          }
        ]
      }
    })

    res.status(200).json(doctors)

  } catch (error) {
    res.status(500).json({ error })

  }
}

export async function getAllDoctorAdminHandler(req: Request, res: Response) {
  try {
    const data = await getAllDoctorAdmin()

    const doctors = data.map((item) => {
      return {
        id: item.id,
        fullName: item.user.fullName,
        email: item.user.email,
        password: item.user.password,
        status: item.user.status,
        image: item.image,
        phone: item.phone,
        specialities: [] =
          item.specialities.map((item) => {
            return item.speciality.name
          }),
        socialLinks: [
          {
            type: "facebook",
            url: item.facebook
          },
          {
            type: "twitter",
            url: item.twitter
          },
          {
            type: "linkedin",
            url: item.linkedin
          },
          {
            type: "instagram",
            url: item.instagram
          }
        ]
      }
    })

    res.status(200).json(doctors)

  } catch (error) {
    res.status(500).json({ error })

  }
}

export async function getAllDoctorBySpecialityHandler(req: Request, res: Response) {
  try {
    const { specialityName = "" }: { specialityName?: string } = req.query;
    const data = await getAllDoctorBySpeciality(specialityName)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }

}

export async function createDoctorHandler(req: Request, res: Response) {

  try {
    const { userData, doctorData, specialitiesNames } = req.body;

    const doctor = await createDoctor(userData, doctorData, specialitiesNames);

    return res.status(200).json({ message: "Doctor created successfully", doctor })

  } catch (error) {
    return res.status(404).json({ error })
  }

}

export async function updateDoctorHandler(req: OptionRequest, res: Response) {

  try {
    const { doctor: { id: doctorId } } = req.user
    const data = req.body

    const doctor = await updateDoctor(doctorId, data)

    return res.status(200).json({ message: "Doctor updated successfully" })

  } catch (error) {
    return res.status(404).json({ error })
  }

}

export async function updateAnyDoctorHandler(req: Request, res: Response) {

  try {
    const id = req.params.id
    const data = req.body

    const doctor = await updateDoctor(id, data)

    return res.status(200).json({ message: "Doctor updated successfully" })

  } catch (error) {
    return res.status(404).json({ error })
  }

}