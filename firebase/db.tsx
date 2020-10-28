import { db } from './firebase';

export const doCreateUser = (id: string, username: string, email: string) =>
  db.collection('users').doc(`${id}`).set({
    email,
    username,
  });
