import express from 'express';
import path from 'path';
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
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
