import { Router } from 'express';
import { register } from '../methods/register';
import { login } from '../methods/login';

const routes = Router();

routes.post('/register', register);
routes.post('/login', login);

export default routes;
