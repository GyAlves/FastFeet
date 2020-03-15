import { Router } from 'express';
import User from './app/models/User';

import UserController from './app/controller/UserController';

const routes = new Router(); // instancio um novo objeto Router

routes.post('/users', UserController.store);

export default routes;
