import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';
import DeliverymanController from './app/controller/DeliverymanController';
import DeliveriesController from './app/controller/DeliveriesController';
import FileController from './app/controller/FileController';
import AvailableController from './app/controller/AvailableController';
import NotAvailableController from './app/controller/NotAvailableController';
import StartDateController from './app/controller/StartDateController';
import EndDateController from './app/controller/EndDateController';
import DeliveryProblemsController from './app/controller/DeliveryProblemsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router(); // instancio um novo objeto Router
const upload = multer(multerConfig);

routes.get('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.post('/destinatarios', authMiddleware, RecipientController.store);
routes.put('/destinatarios/:id', authMiddleware, RecipientController.update);

routes.post('/deliveryman', authMiddleware, DeliverymanController.store);
routes.get('/deliveryman', authMiddleware, DeliverymanController.index);
routes.put('/deliveryman/:id', authMiddleware, DeliverymanController.update);
routes.delete('/deliveryman/:id', authMiddleware, DeliverymanController.delete);

routes.post('/deliveries', authMiddleware, DeliveriesController.store);
routes.get('/deliveries', authMiddleware, DeliveriesController.index);
routes.put('/deliveries/:id', authMiddleware, DeliveriesController.update);
routes.delete('/deliveries/:id', authMiddleware, DeliveriesController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliveryman/deliveries', AvailableController.index);
routes.get('/deliveryman/:id/deliveries', NotAvailableController.index);

routes.put('/deliveryman/:userId/deliveries', StartDateController.update);
routes.put('/deliverymans/:userId/deliveries', EndDateController.update);

routes.post('/deliveryman/:userId/problems', DeliveryProblemsController.store);
export default routes;
