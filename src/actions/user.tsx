import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../firebase/firebase";

export function GetAllUsersFromDatabase() {
  const dispatch = useDispatch();
  useEffect(() => {
    db.collection("users").onSnapshot(
      (
        snapshot: firebase.firestore.QuerySnapshot<
          firebase.firestore.DocumentData
        >
      ) => {
        const rr = snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          username: doc.data().username,
        }));

        dispatch({ type: "USER_SET", payload: rr });
      }
    );
  }, [dispatch]);
}
