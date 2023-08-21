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
router.get('/single', isAuthenticated, getUserHandler);

// /api/users/ -> DELETE
router.delete('/', isAuthenticated, deleteUserHandler);

// /api/users/ -> PATCH
router.patch('/', isAuthenticated, updateUserHandler);

// /api/users/:id -> PATCH
router.patch('/:id', isAuthenticated, hasRole(['ADMIN']), updateAnyUserHandler);

// /api/users/change-password -> PATCH
router.patch('/change-password', isAuthenticated, changePasswordHandler)

export default router;
