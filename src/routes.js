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
export default routes;
