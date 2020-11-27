import { Router } from 'express';
import { toplist } from '../methods/toplist';
import { allCoins } from '../methods/all-coins';
import { priceMulti } from '../methods/price-multi';

const routes = Router();

// toplist
routes.get('/toplist', toplist);
routes.get('/coin-complete-list', allCoins);
routes.get('/pricemulti', priceMulti);

export default routes;