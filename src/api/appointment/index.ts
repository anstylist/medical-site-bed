import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";
import { appointmentWithPatientHandler, createAppointmentWithPatientHandler } from "./appointment.controller";

const router = Router()

// /api/appointments -> POST
router.post('/', isAuthenticated, createAppointmentWithPatientHandler);

// /api/appointments/patient -> GET
router.get('/patient', isAuthenticated, hasRole(['PATIENT']), appointmentWithPatientHandler);


export default router;