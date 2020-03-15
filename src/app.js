import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express(); // defino uma variável que recebe a função express
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // aplicação pronta pra receber requisições em JSON
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
