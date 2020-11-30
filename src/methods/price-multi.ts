import { Request, Response } from 'express';
import api from '../services/api';

interface PriceList {
    Data: {
        [coin: string]: {
            [conversion: string]: string;
        };
    };
}

// price multi
export const priceMulti = async (request: Request, response: Response): Promise<void> => {
  const { desiredCoin } = request.params;
  let { data: fsyms } = await api.get<string>(`http://localhost:3333/currency/coin-complete-list/${desiredCoin}`);
  if (!fsyms) {
    response.status(400).json({ status: 'error', message: `${desiredCoin} is not a valid coin` });
    return;
  }
  while (fsyms.length > 300) {
    const lastComma = fsyms.lastIndexOf(',');
    fsyms = fsyms.substring(0, lastComma);
  }
  const { data: prices } = await api.get<PriceList>(`pricemulti?fsyms=${fsyms}&tsyms=BRL`);
  response.json(prices);
};