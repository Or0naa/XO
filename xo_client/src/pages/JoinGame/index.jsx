import React, { useState, useEffect } from 'react';
import BackArrow from '../../components/BackArrow';
import Title from '../../components/Title';
import Frame from '../../components/Frame';
import Button from '../../components/Button';
import style from './style.module.scss';
import useSocket from '../../socket';

export default function JoinGame({ connectToRoom }) {
  const socket = useSocket();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Define joinRoomHandler function
    const joinRoomHandler = (roomId) => {
      socket.emit('game:join-room', roomId);

      socket.on('roomData', (room) => {
        // Handle room data here if needed
        console.log('Room data:', room);
      });

      socket.on('roomFull', () => {
        setErrorMessage('Room is full. Please try another room.');
      });
    };

    // Optional cleanup function
    return () => {
      socket.off('roomData');
      socket.off('roomFull');
    };
  }, [socket]);

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
        {errorMessage && <div className={style.error}>{errorMessage}</div>}
      </Frame>
      <span>Or</span>
      <div onClick={() => window.location.href = "/create"}>
        <Button>Create Game</Button>
      </div>
    </div>
  );
}
