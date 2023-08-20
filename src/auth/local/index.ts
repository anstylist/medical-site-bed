import { Router } from 'express'

import { loginHandler, forgotPasswordHandler, resetPasswordHandler } from './local.controller'
import { isAuthenticated } from '../auth.controller'

const route = Router()

//login -> POST /auth/login
route.post('/login', loginHandler)

//forgot password
route.post('/forgot-password', forgotPasswordHandler)

//reset password
route.patch('/reset-password', resetPasswordHandler)

//active account
//louout

export default route