import { Router } from "express";
import { getCountryHandler } from "./country.controller";

const router = Router()
// /api/country ->GET
router.get('/', getCountryHandler)

export default router