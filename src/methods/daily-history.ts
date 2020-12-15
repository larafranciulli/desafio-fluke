import { Request, Response } from 'express';
import api from '../services/api';
import { format } from 'date-fns';

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

interface ALlCoinList {
    Data: {
        [coin: string]: {
            FullName: string;
            Symbol: string;
        };
    };
}

export const dailyHistory = async (request: Request, response: Response): Promise<void> => {
    let { desiredCoin } = request.params;

    const { data: allCoinsData } = await api.get<ALlCoinList>('all/coinlist?summary=true');

    // lógica se fizesse a requisição pelo nome da moeda
    
    // desiredCoin = desiredCoin.toLowerCase();
    
    // // filter array
    // let filteredList = Object.values(allCoinsData.Data).map(coin => {
    //     if (coin.FullName.toLowerCase().includes(desiredCoin)) {
    //         return coin.Symbol;
    //     } else {
    //         return null;
    //     }
    // });

    // filteredList = filteredList.filter(value => {
    //     if (value != null) {
    //         return value;
    //     }
    // });

    // // turn array into string
    // let fsym = filteredList.join();
    
    // if (!fsym) {
    //     response.status(400).json({ status: 'error', message: `${desiredCoin} is not a valid coin` });
    //     return;
    // }

    // const firstComma = fsym.indexOf(',');
    // fsym = fsym.substring(0, firstComma);
   
    // lógica se fizer requisição pelo símbolo da moeda

    try {
        const { data } = await api.get<CoinList>(`v2/histoday?tsym=BRL&fsym=${desiredCoin.toUpperCase()}`);
        const history = data.Data.Data.map(moeda => {
            return {
                date: format(new Date(1000 * parseInt(moeda.time)), 'dd/MM/yyyy'),
                open: moeda.open,
                close: moeda.close,
                low: moeda.low,
                high: moeda.high,
            }
        });
    
        const coin = Object.values(allCoinsData.Data).find(coin => coin.Symbol === desiredCoin.toUpperCase())!;
    
        response.json({name: coin.FullName, symbol: coin.Symbol, history});
    } catch (err) {
        response.status(400).json({message: 'Moeda não existe'});
    }
};