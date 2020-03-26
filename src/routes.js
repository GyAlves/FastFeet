import { Router } from 'express';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliverymanController from './app/controller/DeliverymanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router(); // instancio um novo objeto Router
routes.get('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.post('/destinatarios', authMiddleware, RecipientController.store);
routes.put('/destinatarios/:id', authMiddleware, RecipientController.update);

routes.post('/deliveryman', authMiddleware, DeliverymanController.store);
routes.get('/deliveryman', authMiddleware, DeliverymanController.index);
routes.put('/deliveryman/:id', authMiddleware, DeliverymanController.update);
routes.delete('/deliveryman/:id', authMiddleware, DeliverymanController.delete);
export default routes;
