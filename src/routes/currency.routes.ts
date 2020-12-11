import { Router } from 'express';
import { toplist } from '../methods/toplist';
import { allCoins } from '../methods/all-coins';
import { priceMulti } from '../methods/price-multi';
import { dailyHistory } from '../methods/daily-history';
import { authentication } from './middlewares/authentication';

const routes = Router();

// passa authentication para todas as rotas abaixo
routes.use(authentication);

routes.get('/toplist', toplist);
routes.get('/coin-complete-list/:desiredCoin', allCoins);
routes.get('/price-multi/:desiredCoin', priceMulti);
routes.get('/daily-history/:desiredCoin', dailyHistory);

export default routes;