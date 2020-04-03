import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import DeliverymanSessionController from './app/controller/DeliverymanSessionController';
import RecipientController from './app/controller/RecipientController';
import DeliverymanController from './app/controller/DeliverymanController';
import FileController from './app/controller/FileController';
import authMiddleware from './app/middlewares/auth';
import DeliverymanAuth from './app/middlewares/DeliverymanAuth';
import DeliveriesController from './app/controller/DeliveriesController';
import AvailableDController from './app/controller/AvailableDController';

const routes = new Router();
const upload = multer(multerConfig);
routes.get('/session', SessionController.store);
routes.get('/deliverymanSession', DeliverymanSessionController.store);

routes.post('/users', UserController.store);

routes.post('/destinatarios', authMiddleware, RecipientController.store);
routes.put('/destinatarios/:id', authMiddleware, RecipientController.update);

routes.post('/files', upload.single('files'), FileController.store);

routes.post('/deliveryman', authMiddleware, DeliverymanController.store);
routes.get('/deliveryman', authMiddleware, DeliverymanController.index);
routes.put('/deliveryman/:id', authMiddleware, DeliverymanController.update);
routes.delete('/deliveryman/:id', authMiddleware, DeliverymanController.delete);

routes.post('/deliveries', authMiddleware, DeliveriesController.store);
routes.get('/deliveries', authMiddleware, DeliveriesController.index);
routes.put('/deliveries/:id', authMiddleware, DeliveriesController.update);
routes.delete('/deliveries/:id', authMiddleware, DeliveriesController.delete);

routes.get(
  '/available/deliveries',
  DeliverymanAuth,
  AvailableDController.index
);
export default routes;
