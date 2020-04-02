import { Router } from 'express';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import DeliverymanSessionController from './app/controller/DeliverymanSessionController';
import RecipientController from './app/controller/RecipientController';
import DeliverymanController from './app/controller/DeliverymanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.get('/session', SessionController.store);
routes.get('/deliverymanSession', DeliverymanSessionController.store);

routes.post('/users', UserController.store);

routes.post('/destinatarios', authMiddleware, RecipientController.store);
routes.put('/destinatarios/:id', authMiddleware, RecipientController.update);

routes.post('/deliveryman', authMiddleware, DeliverymanController.store);
routes.get('/deliveryman', authMiddleware, DeliverymanController.index);
routes.put('/deliveryman/:id', authMiddleware, DeliverymanController.update);
routes.delete('/deliveryman/:id', authMiddleware, DeliverymanController.delete);
export default routes;
