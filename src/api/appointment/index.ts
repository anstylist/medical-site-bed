import { Router } from "express";
import { hasRole, isAuthenticated } from "../../auth/auth.controller";
import { UpdateStatusAppointmentHandler, appointmentWithDoctorHandler, appointmentWithPatientHandler, createAppointmentWithPatientHandler, getAllAppointmentsHandler } from "./appointment.controller";

const router = Router()

// /api/appointments -> POST
router.post('/', isAuthenticated, createAppointmentWithPatientHandler);

// /api/appointments/patient -> GET
router.get('/patient', isAuthenticated, hasRole(['PATIENT']), appointmentWithPatientHandler);

// /api/appointments/doctor -> GET
router.get('/doctor', isAuthenticated, hasRole(['DOCTOR']), appointmentWithDoctorHandler);

// /api/appointments/all -> GET
router.get('/all', isAuthenticated, hasRole(['ADMIN']), getAllAppointmentsHandler)

// /api/appointments/:id -> PATCH
router.patch('/:id', isAuthenticated, hasRole(['DOCTOR', 'PATIENT', 'ADMIN']), UpdateStatusAppointmentHandler);

export default router;