import React, { useState,useEffect } from 'react';
import"./SidebarChat.css";
import {Avatar} from "@material-ui/core"
import db from '../firebase';
import {Link} from 'react-router-dom'
function SidebarChat({id,name,addNewChat}) {

    const [seed,setSeed] = useState('');

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[])

    const createChat = ()=>{
        const roomName = prompt("Please Enter name for Chat");
        if(roomName){
            //do some database stuff
            db.collection('rooms').add({name:roomName,});
        }
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>last Message.....</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
