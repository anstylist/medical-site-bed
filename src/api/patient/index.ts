import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import { getAllPatientsHandler, getPatientSingle, updatePatientHandler } from './patient.controller';

const router = Router();

// /api/patient/appointments -> PATCH
router.patch('/my-profile', isAuthenticated, hasRole(['PATIENT']), updatePatientHandler);

// /api/patient/all -> GET
router.get('/all', isAuthenticated, hasRole(['ADMIN']), getAllPatientsHandler);

// /api/patient/appointments -> GET
router.get('/', isAuthenticated, getPatientSingle);

export default router;
