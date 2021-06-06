import { Router } from 'express';
import { container } from 'tsyringe';
import TestCRUDService from '../../services/testCRUDService';

const route = Router();

export default (app: Router) => {
  app.use('/crud', route);

  const crudTest = container.resolve(TestCRUDService);

  route.post('/', (req, res) => {
    crudTest.create(req.body);

    res.send('POST Request Called');
  });
};
