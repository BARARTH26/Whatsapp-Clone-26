import React, { useState,useEffect } from 'react'
import "./Chat.css";
import {Avatar,IconButton} from "@material-ui/core";
import {AttachFile,MoreVert,SearchOutlined, SettingsInputAntenna} from "@material-ui/icons"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic"
import {useParams} from "react-router-dom";
import db from "../firebase";
import { useStateValue } from './StateProvider';
import firebase from "firebase";   //for to get TimeStamp


function Chat() {

    const [seed,setSeed] = useState("");
    const [input,setInput] = useState("");
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name)
            )

            db.collection('rooms').doc(roomId).collection('messages').orderBy("timestamp","asc").onSnapshot((snapshot)=> 
            setMessages(snapshot.docs.map((doc)=> doc.data())));


        }
    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId])

    const sendMessage = (e)=>{
        e.preventDefault();
        console.log("You Typed ==>",input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            name : user.displayName,
            message : input,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen at....</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}><span className="chat__name">{message.name}</span>{message.message} <span className="chat__timeStamp">
                        {
                            new Date(message.timestamp?.toDate()).toUTCString()
                        }
                    </span></p>
                ))}
                
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input type="text" value={input} onChange={(e)=>
                        setInput(e.target.value)
                    } placeholder="Type a Message" />
                    <button type="submit" onClick={sendMessage}>Send a Message</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
