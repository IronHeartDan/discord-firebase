import { Button } from '@material-ui/core';
import { AddCircle, CardGiftcard, Gif, InsertEmoticon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Chat.css';
import ChatHeader from './ChatHeader';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './Firebase';
import Message from './Message';
import firebase from 'firebase';

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot)=>{
                setMessages(snapshot.docs.map((doc)=> 
                    doc.data()
                ))
            })
        }
    }, [channelId])

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message : input,
            user : user
        })
        setInput("");
    }

    return (
        <div className='chat'>
            <ChatHeader channelName={channelName}/>
            <div className="chat_area">
                {messages.map((message) => (
                    <Message key={message.timestamp} timestamp={message.timestamp} message={message.message} user={message.user}/>
                ))}
            </div>
            <div className="chat_input">
                <AddCircle/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} disabled={!channelId} type="text" placeholder={`Send Message In ${channelName}`}/>
                    <Button onClick={sendMessage} type='submit'>Send</Button>
                </form>
                <CardGiftcard/>
                <Gif/>
                <InsertEmoticon/>
            </div>
        </div>
    )
}

export default Chat
