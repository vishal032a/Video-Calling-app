import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {

    const [email, setemail] = useState("");
    const [room, setroom] = useState("");

    const socket = useSocket();

    const navigate = useNavigate();


    const handleSubmitForm = useCallback((e)=>{
        e.preventDefault();
        socket.emit("room:join",{email,room});
    },
    [email,room,socket]
    );

    const handleJoinRoom = useCallback((data)=>{
        const {email , room} = data; 
        navigate(`/room/${room}`)
    },[navigate])


    useEffect(()=>{
        socket.on("room:join",handleJoinRoom);
        return ()=>{
            socket.off("room:join");
        }
    })

    return (
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email ID</label>
                <input type="email" id="email" value={email}  onChange={(e)=>setemail(e.target.value)}/>
                <label htmlFor="room">Room Number</label>
                <input type="number" id="room" value={room} onChange={(e)=>setroom(e.target.value)} />
                <br />
                <button>Join</button>
            </form>

        </div>
    );
};

export default LobbyScreen;