import { Request, Response } from 'express';
import {
  createSpeciality,
  deleteSpeciality,
  getAllSpeciality,
  updateSpeciality
} from './speciality.service';

export async function getAllSpecialityHandler(req: Request, res: Response) {
  const specialities = await getAllSpeciality()
  res.status(200).json(specialities)
}

export async function updateSpecialityHandler(req: Request, res: Response) {

  try {
    const data = req.body
    await updateSpeciality(data)
    res.status(200).json({ message: 'Update successfully' })

  } catch (error) {
    res.status(404).json({ error })
  }

}

export async function deleteSpecialityHandler(req: Request, res: Response) {

  try {
    const { id } = req.body
    await deleteSpeciality(id)
    res.status(200).json({ message: 'Delete successfully' })

  } catch (error) {
    res.status(404).json({ error })
  }

}

export async function createSpecialityHandler(req: Request, res: Response) {

  try {
    const data = req.body
    await createSpeciality(data)
    res.status(200).json({ message: 'Create successfully' })

  } catch (error) {
    res.status(404).json({ error })
  }

}