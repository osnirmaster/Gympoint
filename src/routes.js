import { Router } from 'express';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

export default routes;
