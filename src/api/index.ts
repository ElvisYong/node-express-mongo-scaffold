import { Router } from 'express';
import helloworld from './routes/helloworld';
import testCrud from './routes/testCrud';

export default () => {
  const app = Router();
  helloworld(app);
  testCrud(app);

  return app;
};
