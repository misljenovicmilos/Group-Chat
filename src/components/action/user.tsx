import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../../firebase/firebase';

export function GetAllUsersFromDatabase() {
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection('users').onSnapshot((snapshot: any) => {
      const rr = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        email: doc.data().email,
        username: doc.data().username,
      }));

      dispatch({ type: 'USER_SET', payload: rr });
    });
  }, [dispatch]);
}
