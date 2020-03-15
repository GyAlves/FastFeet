import { Router } from 'express';

const routes = new Router(); // instancio um novo objeto Router

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

export default routes;
