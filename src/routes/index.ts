import { Router } from 'express';
import currencyRouter from './currency.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/currency', currencyRouter);
routes.use('/users', usersRouter);

export default routes;