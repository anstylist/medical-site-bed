import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import userRouter from './api/user';
import authLocalRouter from './auth/local';

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)

  //Auth
  app.use('/auth/local', authLocalRouter)

}

export default routes