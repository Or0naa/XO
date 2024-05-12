import React, { useState, useEffect } from 'react';
import BackArrow from '../../components/BackArrow';
import Title from '../../components/Title';
import Frame from '../../components/Frame';
import Button from '../../components/Button';
import style from './style.module.scss';


export default function JoinGame({ connectToRoom }) {
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
      <BackArrow className={style.back} />
      <Title>Join A Game</Title>
      <Frame>
          <form onSubmit={handleSubmit}>
            <input className={style.join} type="text" placeholder="Enter code game" name="roomId" />
            <button type="submit">Join</button>
          </form>
      </Frame>
      <span>Or</span>
      <div onClick={() => window.location.href = "/create"}>
        <Button>Create Game</Button>
      </div>
    </div>
  );
}