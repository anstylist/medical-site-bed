import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import doctorRouter from './api/doctor';
import specialityRouter from './api/speciality';
import patientRouter from './api/patient'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)
  app.use('/api/doctors', doctorRouter)
  app.use('/api/speciality', specialityRouter)
  app.use('/api/patient/', patientRouter)

  //Auth
  app.use('/api/auth', authLocalRouter)

}

export default routes