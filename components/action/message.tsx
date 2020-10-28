import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/firebase";

export default function NewMessage(value:string){
    const dispatch=useDispatch();
    useEffect(() => {
        db.collection('rooms')
          .doc(value)
          .collection('Messages')
    
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
            const newuser = snapshot.docs.map((doc) => ({
              id: doc.id,
              from: doc.data().from,
              text: doc.data().text,
              timestamp: doc.data().timestamp,
            }));
            dispatch({ type: 'MESSAGE_SET', payload: newuser[0] });
            
          });
      }, [dispatch, value]);
}