import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function GetAllEmoji(){
    const dispatch=useDispatch();
useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json'
    )
      .then((data) => data.json())
      .then((data) => {
        dispatch({ type: 'EMOJI_SET', payload: data });
      });
  }, [dispatch]);
}