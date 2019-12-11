import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plan', PlanController.index);
routes.post('/plan', PlanController.store);
routes.put('/plan/:id', PlanController.update);
routes.delete('/plan/:id', PlanController.delete);

routes.get('/enrollment', EnrollmentController.index);
routes.post('/enrollment', EnrollmentController.store);
routes.put('/enrollment/:id', EnrollmentController.update);
routes.delete('/enrollment/:id', EnrollmentController.delete);

export default routes;
