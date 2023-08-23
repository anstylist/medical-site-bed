import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";
import { createAppointmentWithPatientHandler } from "./appointment.controller";

const router = Router()

// /api/appointments -> POST
router.post('/', isAuthenticated, createAppointmentWithPatientHandler);


export default router;