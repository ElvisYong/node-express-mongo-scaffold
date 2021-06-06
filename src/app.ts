import 'reflect-metadata';
import express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  const loaders = await import('./loaders');
  loaders.default({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info('Node server listening on port: 3000');
    })
    .on('error', (error) => {
      Logger.error(error);
      process.exit(1);
    });
}
startServer();
