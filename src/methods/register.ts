import { Request, Response } from 'express';
import { firestore } from '../database/firebase';
import { hash } from 'bcrypt';

export const register = async (request: Request, response: Response): Promise<void> => {
  const { user, password, email } = request.body;

  const { empty } = await firestore.collection('users').where('email', '==', email).get();

  if (!empty) {
    response.status(400).json({ message: 'email já cadastrado' });
    return;
  }

  const hashed = await hash(password, 8);

  await firestore.collection('users').doc().set({
    user: user,
    password: hashed,
    email: email
  });

  response.send();

};

// Comparando a JS
// const fs = {
//   users: {
//     bu23ghb45uhwb: {
//       name: 'Lara',
//       password: '123',
//       email: 'lara@lara.com.br',
//     },
//     a35lkj6hnejlk: {
//       name: 'FIlipe',
//       password: '123',
//       email: 'filipe@filipe.com.br',
//     },
//     kjhnt6uhwasdhj: {
//       name: 'Pai',
//       password: '123',
//       email: 'Pai@paia.com.br',
//     }
//   }
// };
// fs.users.bu23ghb45uhwb;
// fs => firestore()
// users => collection
// bu23ghb45uhwb => doc
// firestore().collection('users').doc('bu23ghb45uhwb').get();

// Formulário com USER, PASSWORD e EMAIL; => body
// const {} = request.body => no corpo - { "body": "123"}
// const {} = request.query => como query - rota?query=abc
// const {} = request.params => nota rota - route/PARAM

