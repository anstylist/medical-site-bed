import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import { getDoctorAppointmentsHandler } from './doctor.controller';

const router = Router();

// /api/doctor/appointments -> GET
router.get('/appointments', isAuthenticated, hasRole(['DOCTOR']), getDoctorAppointmentsHandler);

export default router;