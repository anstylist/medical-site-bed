import { Router } from 'express';
import { isAuthenticated } from '../../auth/auth.controller';
import { checkoutHandler } from './checkout.controller';

const router = Router()

router.use(isAuthenticated)

router.post('/', checkoutHandler)

export default router
