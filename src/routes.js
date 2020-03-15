import { Router } from 'express';
import User from './app/models/User';

const routes = new Router(); // instancio um novo objeto Router

routes.get('/users', async (req, res) => {
  const user = await User.findAll();
  return res.json(user);
});
export default routes;
