import { Router } from 'express';

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';

const routes = new Router(); // instancio um novo objeto Router
routes.get('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.post('/destinatarios', RecipientController.store);

export default routes;
