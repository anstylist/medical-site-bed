import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import { getPatientAppointmentByIDHandler, updatePatientHandler } from './patient.controller';

const router = Router();

// /api/patient/appointments -> PATCH
router.patch('/my-profile', isAuthenticated, hasRole(['PATIENT']), updatePatientHandler);

// /api/patient/appointments -> GET
router.get('/appointments', isAuthenticated, hasRole(['PATIENT']), getPatientAppointmentByIDHandler);

export default router;
