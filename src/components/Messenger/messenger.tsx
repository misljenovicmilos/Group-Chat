import React, { useState, useEffect, CSSProperties} from 'react';
import { auth, db } from '../../firebase/firebase';
import { GetAllUsersFromDatabase } from '../action/user';
import SessionAccount from '../action/session';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducers';
import { Helmet } from 'react-helmet';
import * as routes from '../../routes';
import { useHistory } from 'react-router-dom';
import './messenger.css';
import Modal from 'react-modal';
import GetAllEmoji from '../action/emoji';
import NewMessage from '../action/message';



interface Messages {
  id?: string;
  from?: any;
  text?: string;
   timestamp?: any;
}
interface Rooms{
  id: string | number | null | undefined;
  opisSobe?:string;
}

export function Messenger() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const [value, setValue] = useState('404!');
  const[valueRoom,setValueRoom]=useState<Rooms[]>([] as Rooms[]);;
  const [messages, setMessages] = useState<Messages[]>([] as Messages[]);
  GetAllUsersFromDatabase();
  SessionAccount();
  GetAllEmoji();
  NewMessage(value);
  const history = useHistory();
  const dispatch = useDispatch();
  const allEmoji = useSelector((state: AppState) => state.emojiState.emoji);
  const allUsersFromDatabase = useSelector((state: AppState) => state.userState.users);
  const authUserIsSignIn = useSelector((state: AppState) => state.sesionState.authUser);
  const all = Object.keys(allEmoji).map((id) => allEmoji[id]);
  const newMessages = useSelector(
    (state: AppState) => state.messageState.messages
  );
  const allEmailFromDatabase = Object.keys(allUsersFromDatabase).map((id) => allUsersFromDatabase[id]);
  const userIsOnline = authUserIsSignIn.email;
  const Email = allEmailFromDatabase.filter((user) => user.email === userIsOnline);
  const username = Email.map((item) => item.username);

  
  useEffect(() => {
    db.collection('rooms')
      .doc(value)
      .collection('Messages')

      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        const newuser = snapshot.docs.map((doc) => ({
          id: doc.id,
          from: doc.data().from,
          text: doc.data().text,
          
          timestamp: doc.data().timestamp,
        }));
       
        setMessages(newuser);
      
      });
  }, [value]);

  function pressEnter(event: { key: string }) {
    if (event.key === 'Enter') {
      const time = new Date();
      db.collection('rooms').doc(value).collection('Messages').add({
        from: username,
        text: input,
        timestamp: time.getTime()
      });
      setInput("");
    }
  }
  function handleClick() {
    const time = new Date();
    
    db.collection('rooms').doc(value).collection('Messages').add({
      from: username,
      text: input,
      timestamp: time.getTime()
     
    });
    
    setInput("");
  }
  function handleClickToSignOut() {
    auth.signOut().then(() => {
      history.push(routes.SING_IN);
    });
  }
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>)  {
    event.preventDefault();
    setValue(event.target.value);
    
      setInput("");
  }
  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setInput(event.target.value)
  }
  function movefunction(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    if (!newMessages.from) {
      return;
    }
    event.preventDefault();
    dispatch({ type: 'MESSAGE_CLEAR' });
  }
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    if (newMessages.text) {
      setTitle('New Message!!!');
    } else {
      setTitle('Chat');
    }
  }, [newMessages]);

  
  
  const right:CSSProperties= {
   float:"right",
   
  maxWidth:"500px",
  
   background: " #FF66CC"
  
  };
  const time:CSSProperties={
    float:"right",
    
    fontWeight:"bolder"
    
  }
  const righttime:CSSProperties={
    float:"left",
    fontWeight:"bolder"
  }
  function handleclickemoji(event: any)  {
    event.preventDefault();

    setInput( event.target.innerHTML);
  }
 
  useEffect(() => {
    db.collection('rooms')
      
      .onSnapshot((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>)=>{
        const rooms=(snapshot.docs.map((doc) => ({
        id:doc.id, 
         opisSobe: doc.data().opisSobe
        })));
        setValueRoom(rooms)
      });
  }, [value]);
  const valueroom = valueRoom.filter((user) => user.id === value);
  const opisSobe = valueroom.map((item) => item.opisSobe);
 

  return (
    <div className="container">

      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="lista"  >
        {messages.map((message: Messages) => (
          <ul
            key={message.id}


          >
            <li className="li-him" style={message.from[0] === username[0] ? right : undefined}>{message.from}:{message.text} </li>
        <li className="li-time" style={message.from[0] === username[0] ? time : righttime}>{(new Date(message.timestamp).getHours())}:{(new Date(message.timestamp).getMinutes())}</li>
          </ul>
            
        ))} 
       </div>
       
        <div className="container-1">
        <input
        onMouseMove={movefunction}
        className="inputype"
        placeholder="Enter text here..."
        value={input}
        onKeyDown={pressEnter}
        onChange={handleChangeInput}
      />
      <button className="botton-emoji"  onClick={() => setModalIsOpen(true)}>:)</button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        
      ><span className="close-emoji" onClick={() => setModalIsOpen(false)}>X</span>
      <br></br>
        {all.map((item) => (
          <button onClick={handleclickemoji} key={item.id} value={item.emoji}>
            {item.emoji}
          </button>
        ))}
             
      </Modal>
      
      <button onClick={handleClick} className="btn">
        SEND
      </button>
        </div>
      <div className="container-2">
      
        <select className="rooms"onChange={handleChange}  >
          <option  value={'404!'}>404!</option>
          <option  value={'Area 51'}>Area 51</option>
          <option  value={'SQUAAAAAAAD'}>SQUAAAAAAAD</option>
          <option value={'Codename: Kids Next Door'}>
            Codename: Kids Next Door
          </option>
        </select>
        <p>You selected room: {value}</p>
      
      <button type="button" className="btn-signOut" onClick={handleClickToSignOut}>
        SignOut
      </button>
        <p>{opisSobe}</p>
      
      </div>
      </div>
    
    
  );
}
