
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../../firebase/firebase';

export default function SessionAccount() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'AUTH_USER_SET', payload: user });
      }
      else{
          dispatch({type:'AUTH_USER'});
          }
      }
    );
  }, [dispatch]);
}
