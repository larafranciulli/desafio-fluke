import {Request, Response} from 'express';
import api from '../services/api';

// tipagem do typescript para o retorno da requisição
interface TotalRequest {
  Data: [
      {
          CoinInfo: {
              FullName: string,
              Name: string,
              Url: string,
              Rating: {
                  Weiss: {
                      Rating: string,
                      TechnologyAdoptionRating: string,
                      MarketPerformanceRating: string, 
                  }
              } 
          },
          DISPLAY: {
              BRL: {
                  MARKET: string,
                  PRICE: string,
                  LASTUPDATE: string,
                  OPENDAY: string,
                  HIGHDAY: string,
                  LOWDAY: string,
              }
          }
      }
  ]
};

export const toplist = async (request: Request, response: Response) => {
  const { data } = await api.get<TotalRequest>('top/totalvolfull?tsym=BRL');
  const serialized = data.Data.map(moeda => {
      return {
          fullname : moeda.CoinInfo.FullName,
          //name : moeda.CoinInfo.Name,
          //url : moeda.CoinInfo.Url,
          rating: moeda.CoinInfo.Rating.Weiss.Rating,
          techRaiting: moeda.CoinInfo.Rating.Weiss.TechnologyAdoptionRating,
          marketRaiting: moeda.CoinInfo.Rating.Weiss.MarketPerformanceRating,
          market: moeda.DISPLAY.BRL.MARKET,
          price: moeda.DISPLAY.BRL.PRICE,
          lastUpdate: moeda.DISPLAY.BRL.LASTUPDATE,
          openDay: moeda.DISPLAY.BRL.OPENDAY,
          lowDay: moeda.DISPLAY.BRL.LOWDAY,
          highDay: moeda.DISPLAY.BRL.HIGHDAY,
      }
   });
  response.json(serialized);
}