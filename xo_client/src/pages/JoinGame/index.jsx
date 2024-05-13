import React, { useState, useEffect } from 'react';
import BackArrow from '../../components/BackArrow';
import Title from '../../components/Title';
import Frame from '../../components/Frame';
import Button from '../../components/Button';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';


export default function JoinGame({ connectToRoom }) {
  const nav = useNavigate();
  const {game, setGame} = useGameStore(state => ({
    game: state.game,
    setGame: state.setGame
  }));
  const [roomId, setRoomId] = useState("");
  const joinRoomHandler = (roomId) => {
    setRoomId(roomId);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = e.target.roomId.value;
    connectToRoom(roomId);
    // Call the joinRoomHandler function with the room ID
    joinRoomHandler(roomId);
  };


  return (
    <div className={style.joinGame}>
      <BackArrow />
      <div className={style.title}>
      <Title >Join A Game</Title>
    </div> 
      <form onSubmit={handleSubmit}> <Frame>
      
          <input className={style.join} type="text" placeholder="Enter code game" name="roomId" />
       
        </Frame> </form>
        <div  className={style.littlejoin}>
      <button >Join</button>
      </div>
      <span>Or</span>
      <div onClick={() => window.location.href = "/create"}>
        <Button>Create Game</Button>
      </div>
    </div>
  );
}