import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createDoctorHandler,
  getAllDoctorBySpecialityHandler,
  getAllDoctorHandler,
  getDoctorAppointmentsHandler,
  updateAnyDoctorHandler,
  updateDoctorHandler
} from './doctor.controller';

const router = Router();

// /api/doctors/appointments -> GET
router.get('/appointments', isAuthenticated, hasRole(['DOCTOR']), getDoctorAppointmentsHandler);

// /api/doctors -> GET
router.get('/', getAllDoctorBySpecialityHandler)

// /api/doctors/all -> GET
router.get('/all', getAllDoctorHandler)

// /api/doctors -> POST
router.post('/', isAuthenticated, hasRole(['ADMIN']), createDoctorHandler)

// /api/doctors -> PACTH
router.patch('/', isAuthenticated, hasRole(['DOCTOR']), updateDoctorHandler)

// /api/doctors -> PACTH
router.patch('/:id', isAuthenticated, hasRole(['ADMIN']), updateAnyDoctorHandler)


export default router;