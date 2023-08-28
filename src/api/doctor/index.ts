import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createDoctorHandler,
  getAllDoctorAdminHandler,
  getAllDoctorBySpecialityHandler,
  getAllDoctorHandler,
  getDoctorAppointmentsHandler,
  updateAnyDoctorHandler,
  updateDoctorHandler
} from './doctor.controller';

const router = Router();

// /api/doctors/appointments -> GET
router.get('/appointments', isAuthenticated, hasRole(['DOCTOR']), getDoctorAppointmentsHandler);

// /api/doctors/by-speciality -> GET
router.get('/by-speciality', getAllDoctorBySpecialityHandler);

// /api/doctors/all -> GET
router.get('/', getAllDoctorHandler)

// /api/doctors/ -> GET ALL - ADMIN
router.get('/all', isAuthenticated, hasRole(['ADMIN']), getAllDoctorAdminHandler)

// /api/doctors -> POST
router.post('/', isAuthenticated, hasRole(['ADMIN']), createDoctorHandler)

// /api/doctors -> PACTH
router.patch('/my-profile', isAuthenticated, hasRole(['DOCTOR']), updateDoctorHandler)

// /api/doctors -> PACTH
router.patch('/:id', isAuthenticated, hasRole(['ADMIN']), updateAnyDoctorHandler)


export default router;