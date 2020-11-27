import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import 'express-async-errors';

const app = express();

// indica que podemos enviar e receber json (e não só texto)
app.use(express.json());
app.use(routes);

/*

requisições iniciais de teste

// criar uma rota get
app.get('/teste', (request, response) => {
  response.send('Oi, tudo bom, get?');
});

interface CoinList {
    Data: {
        [coin: string]: {
            FullName: string;
            Symbol: string;
        };
    };
}

// test
app.get('/user/:name', async (request, response) => {
  // const {} = request.body // Corpo
  const { name } = request.params; // Rota

  // tratar o erro
  if (name === 'filipe') {
    throw 'error custom'; // joga pra cima
  }

  try { // tente
    const { data } = await api.get(`/users/${name}`);
    response.json(data);
  } catch (err) { // se der ruim, vamos tratar o erro
    response.json({ status: 'error', message: `${name} not found`, error: err });
  }
});

// criar uma rota post
app.post('/teste', (request, response) => {
  response.send('Oi, tudo bom, post?');
});

*/

// função para express tratar erros
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// dá a porta pra express
app.listen(3333);