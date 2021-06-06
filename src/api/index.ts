import { Router } from "express";
import helloworld from './routes/helloworld';

export default () => {
  const app = Router();
  helloworld(app);

  return app;
}