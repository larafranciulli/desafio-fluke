import { Router } from 'express';
import currencyRouter from './currency.routes';

const routes = Router();

routes.use('/currency', currencyRouter);

export default routes;