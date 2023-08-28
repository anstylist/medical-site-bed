import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import doctorRouter from './api/doctor';
import specialityRouter from './api/speciality';
import patientRouter from './api/patient';
import appointmentRouter from './api/appointment';
import productRouter from './api/product';
import orderRouter from './api/order';
import countryRouter from './api/country'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)
  app.use('/api/doctors', doctorRouter)
  app.use('/api/speciality', specialityRouter)
  app.use('/api/patients/', patientRouter)
  app.use('/api/appointments', appointmentRouter)
  app.use('/api/products', productRouter)
  app.use('/api/orders', orderRouter)
  app.use('/api/country', countryRouter)

  //Auth
  app.use('/api/auth', authLocalRouter)

}

export default routes