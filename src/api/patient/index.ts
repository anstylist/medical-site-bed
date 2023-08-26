import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import { getPatientAppointmentByIDHandler, getPatientSingle, updatePatientHandler } from './patient.controller';

const router = Router();

// /api/patient/appointments -> PATCH
router.patch('/my-profile', isAuthenticated, hasRole(['PATIENT']), updatePatientHandler);

// /api/patient/appointments -> GET
router.get('/appointments', isAuthenticated, hasRole(['PATIENT']), getPatientAppointmentByIDHandler);

// /api/patient/appointments -> GET
router.get('/', isAuthenticated, getPatientSingle);

export default router;
