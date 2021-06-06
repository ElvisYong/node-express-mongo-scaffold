import { Router } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/helloworld', route);

  route.get('/', (req, res) => res.send('Hello World!'));
};
