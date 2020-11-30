import { Request, Response } from 'express';
import api from '../services/api';

interface CoinList {
    Data: {
        Data: [
            {
                time: string,
                high: string,
                low: string,
                open: string,
                close: string,
            }
        ]
    }
};

export const dailyHistory = async (request: Request, response: Response): Promise<void> => {
    const { desiredCoin } = request.params;

    let { data: fsym } = await api.get<string>(`http://localhost:3333/currency/coin-complete-list/${desiredCoin}`);
    
    if (!fsym) {
        response.status(400).json({ status: 'error', message: `${desiredCoin} is not a valid coin` });
        return;
    }

    const firstComma = fsym.indexOf(',');
    fsym = fsym.substring(0, firstComma);
    
    const { data } = await api.get<CoinList>(`v2/histoday?fsym=${fsym}&tsym=BRL`);

    const history = data.Data.Data.map(moeda => {
        return {
            date: new Date(1000 * parseInt(moeda.time)),
            open: moeda.open,
            close: moeda.close,
            low: moeda.low,
            high: moeda.high,
        }
    });
    response.json(history);
};