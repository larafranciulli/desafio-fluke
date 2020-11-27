import { Request, Response } from 'express';
import api from '../services/api';

// tipagem do typescript para o retorno da requisição
interface CoinList {
    Data: {
        [coin: string]: {
            FullName: string;
            Symbol: string;
        };
    };
}

// all coins list
export const allCoins = async (request: Request, response: Response): Promise<void> => {

  // get coin name
  let { desiredCoin } = request.params;
  desiredCoin = desiredCoin.toLowerCase();

  const { data } = await api.get<CoinList>('all/coinlist?summary=true');

  // filter array
  let filteredList = Object.values(data.Data).map(coin => {
    if (coin.FullName.toLowerCase().includes(desiredCoin)) {
      return coin.Symbol;
    } else {
      return null;
    }
  });

  filteredList = filteredList.filter(value => {
    if (value != null) {
      return value;
    }
  });

  // turn array into string
  const values = filteredList.join();

  // faz requisição para pegar os valores convertidos
  response.json(values);
};