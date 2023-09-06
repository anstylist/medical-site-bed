import { Router } from 'express'

import { loginHandler, forgotPasswordHandler, resetPasswordHandler } from './local.controller'

const route = Router()

//login -> POST /api/auth/login
route.post('/login', loginHandler)

//forgot password -> POST /api/auth/forgot-password
route.post('/forgot-password', forgotPasswordHandler)

//reset password -> PATCH /api/auth/reset-password
route.patch('/reset-password/:token', resetPasswordHandler)

//active account
//louout

export default route