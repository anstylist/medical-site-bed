import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createDoctorHandler,
  getAllDoctorAdminHandler,
  getAllDoctorBySpecialityHandler,
  getAllDoctorHandler,
  updateDoctorHandler
} from './doctor.controller';
import multer from 'multer';

const router = Router();

const upload = multer({
  dest: './uploads/doctors',
  preservePath: true,
})

// /api/doctors/by-speciality -> GET
router.get('/by-speciality', getAllDoctorBySpecialityHandler);

// /api/doctors/all -> GET
router.get('/', getAllDoctorHandler)

// /api/doctors/ -> GET ALL - ADMIN
router.get('/all', isAuthenticated, hasRole(['ADMIN']), getAllDoctorAdminHandler)

// /api/doctors -> POST
router.post('/', isAuthenticated, hasRole(['ADMIN']), upload.single('image'), createDoctorHandler)

// /api/doctors -> PACTH
router.patch('/:id', isAuthenticated, hasRole(['ADMIN']), upload.single('image'), updateDoctorHandler)


export default router;