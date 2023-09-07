import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";
import { appointmentWithDoctorHandler, appointmentWithPatientHandler, createAppointmentWithPatientHandler } from "./appointment.controller";

const router = Router()

// /api/appointments -> POST
router.post('/', isAuthenticated, createAppointmentWithPatientHandler);

// /api/appointments/patient -> GET
router.get('/patient', isAuthenticated, hasRole(['PATIENT']), appointmentWithPatientHandler);

// /api/appointments/doctor -> GET
router.get('/doctor', isAuthenticated, hasRole(['DOCTOR']), appointmentWithDoctorHandler);

export default router;