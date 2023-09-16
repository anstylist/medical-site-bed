import { Request, Response } from "express";
import { getCountry } from "./country.service";

export const getCountryHandler = async (req: Request, res: Response) => {
  try {
    const response = await getCountry()
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ error })
  }

}