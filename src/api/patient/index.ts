import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import { getPatientAppointmentByIDHandler, updatePatientHandler } from './patient.controller';

const router = Router();

// /api/patient/appointments -> PATCH
router.patch('/', isAuthenticated, hasRole(['PATIENT']), updatePatientHandler);

// /api/patient/appointments -> PATCH
router.get('/appointments', isAuthenticated, hasRole(['PATIENT']), getPatientAppointmentByIDHandler);

export default router;
