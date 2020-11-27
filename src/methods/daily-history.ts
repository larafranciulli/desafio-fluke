import { Request, Response } from 'express';
import api from '../services/api';

export const dailyHistory = async (request: Request, response: Response) => {
    const desiredCoin = request.params;
    const history = await api.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${desiredCoin}$&tsym=BRL`);
});