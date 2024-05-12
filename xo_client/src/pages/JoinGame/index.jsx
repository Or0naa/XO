import React, { useState, useEffect } from 'react';
import BackArrow from '../../components/BackArrow';
import Title from '../../components/Title';
import Frame from '../../components/Frame';
import Button from '../../components/Button';
import style from './style.module.scss';
import useSocket from '../../socket';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';


export default function JoinGame({ connectToRoom }) {
  const nav = useNavigate();
  const [roomId, setRoomId] = useState("");
  const joinRoomHandler = (roomId) => {
    setRoomId(roomId);
  }

  const socket = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = e.target.roomId.value;
    connectToRoom(roomId);
    // Call the joinRoomHandler function with the room ID
    joinRoomHandler(roomId);
    socket.emit('game:join-room', roomId)
  };


  useEffect(() => {
    socket.on('game:join-success', () => {
      nav('/oponent')
    });

    socket.on('game:join-failure', (message) => {
      alert(message);
    });

    return () => {
      socket.off('game:join-success');
      socket.off('game:join-failure');
    }
  }, [socket, nav]);
  return (
    <div className={style.joinGame}>
      <BackArrow />
      <div className={style.title}>
      <Title >Join A Game</Title>
    </div> 
      <form onSubmit={handleSubmit}> <Frame>
      
          <input className={style.join} type="text" placeholder="Enter code game" name="roomId" />
       
        </Frame> </form>
        <div type="submit" className={style.littlejoin}>
      <Button >Join</Button>
      </div>
      <span>Or</span>
      <div onClick={() => window.location.href = "/create"}>
        <Button>Create Game</Button>
      </div>
    </div>
  );
}