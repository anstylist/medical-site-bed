import { Router } from 'express';

import {
  changePasswordHandler,
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserHandler,
  updateAnyUserHandler,
  updateUserHandler,
} from './user.controller';
import { isAuthenticated } from '../../auth/auth.controller';
import { hasRole } from '../../auth/auth.controller';

const router = Router();

// /api/users -> GET
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllUserHandler);

// /api/users -> POST
router.post('/', createUserHandler);

// /api/users/single -> GET
router.get('/my-profile', isAuthenticated, getUserHandler);

// /api/users/ -> DELETE
router.delete('/my-profile', isAuthenticated, deleteUserHandler);

// /api/users/ -> PATCH
router.patch('/my-profile', isAuthenticated, updateUserHandler);

// /api/users/:email -> PATCH
router.patch('/:email', isAuthenticated, hasRole(['ADMIN']), updateAnyUserHandler);

// /api/users/change-password -> PATCH
router.patch('/change-password', isAuthenticated, changePasswordHandler)

export default router;
