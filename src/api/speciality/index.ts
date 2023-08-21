import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createSpecialityHandler,
  deleteSpecialityHandler,
  getAllSpecialityHandler,
  updateSpecialityHandler
} from './speciality.controller';

const router = Router()

// /api/speciality -> GET
router.get('/', getAllSpecialityHandler);

// /api/speciality -> POST
router.post('/', isAuthenticated, hasRole(['ADMIN']), createSpecialityHandler);

// /api/speciality -> DELETE
router.delete('/', isAuthenticated, hasRole(['ADMIN']), deleteSpecialityHandler);

// /api/speciality -> PATCH
router.patch('/', isAuthenticated, hasRole(['ADMIN']), updateSpecialityHandler);

export default router;
