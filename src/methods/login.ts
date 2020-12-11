import { Request, Response } from 'express';
import { firestore } from '../database/firebase';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
const { token } = require('../../.credentials/jwt');

interface User {
  id: string;
  email: string;
  password?: string;
}

export const login = async (request: Request, response: Response): Promise<void> => {
  const { email, password: providedPass } = request.body;

  const usersSnapshot = await firestore.collection('users').where('email', '==', email).get();

  if(usersSnapshot.empty) {
    response.status(401).json({ message: 'email ou senha incorretos' });
    return;
  }

  const user = usersSnapshot.docs[0].data() as User;
  const uid = usersSnapshot.docs[0].id;

  if (!(await compare(providedPass, user.password!))) {
    response.status(401).json({ message: 'email ou senha incorretos' });
    return;
  }

  const signedToken = sign({} , token,
    {
      subject: uid,
      expiresIn: '14d'
    }
  );

  delete user.password;

  response.json({ user, signedToken });

  // await firestore.collection('users').where('email', '==', email).get()
  //   .then(user => {
  //     if (user.empty) {
  //       incorrect = true;
  //       return;
  //     }

  //     user.forEach(doc => {
  //       const { password } = doc.data();
  //       if (providedPass != password) {
  //         incorrect = true;
  //       }
  //       else {
  //         return;
  //       }
  //     });
  //   });
};
