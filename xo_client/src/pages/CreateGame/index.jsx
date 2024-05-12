import React from 'react';
import BackArrow from '../../components/BackArrow';
import Frame from '../../components/Frame';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import useSocket from '../../socket';
import { useState, useEffect } from 'react';
import { useGameStore } from '../../store';

export default function CreateGame() {
  const nav = useNavigate();
  const socket = useSocket();
  const game = useGameStore(state => state.game);
  const setGame = useGameStore(state => state.setGame);
  const [connect, setConnect] = useState(false);

  const [roomNumber, setRoomNumber] = useState(null);

  useEffect(() => {
    socket.on('roomNumber', (roomNumber) => {
      setRoomNumber(roomNumber);
      console.log('Received roomNumber:', roomNumber);
    });

    socket.on('game:user-success', (room) => {
      if (room.players.length === 2) {
        console.log('Both players joined, navigating to /choose');
        console.log('Room data:', room);
        setGame({ ...game, room: room })
        nav('/choose');
      } else {
        console.log('Not enough players to start the game');
      }
    });

    socket.on('roomFull', () => {
      console.log('Room is full, cannot join');
    });

    return () => {
      socket.off('roomNumber');
      socket.off('game:join-success');
      socket.off('roomFull');
    };
  }, [socket, nav]);

  return (
    <div className={styles.createContainer}>
      <BackArrow />
      <Frame>
        <h1>Your Code: {roomNumber}</h1>
      </Frame>
      <div className={styles.loader}></div>
      {connect ?
        <Button>
          <h2 onClick={() => nav('/choose')}>Choose Shape</h2>
        </Button> :
        <h1>Waiting for opponent</h1>}
    </div>
  );
}