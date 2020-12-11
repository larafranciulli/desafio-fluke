import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
const { token } = require('../../../.credentials/jwt');

export const authentication = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const auth = request.headers.authorization;

  try {
    if (!auth) {
      throw new Error();
    }
    // Bearer asdniasidnhasiduanshd
    const [, providedToken] = (auth as string).split(' ');
    console.log('>', providedToken);
    verify(providedToken, token);
  } catch (err) {
    response.status(401).json({ message: 'token jwt invalido' });
    return;
  }
  next();
};

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDc3MTQxNjYsImV4cCI6MTYwODkyMzc2Niwic3ViIjoiWW55SElSdjZjVXNyTG82Nk1kcHQifQ.9JA8gJgXtwuWmJjmSXAqhgCrX_5kVn6QYvEj8Q4sd8E