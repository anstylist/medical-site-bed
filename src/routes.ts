import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import doctorRouter from './api/doctor'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)
  app.use('/api/doctors', doctorRouter)

  //Auth
  app.use('/api/auth', authLocalRouter)

}

export default routes