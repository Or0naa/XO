import React from 'react';
import BackArrow from '../../components/BackArrow';
import Frame from '../../components/Frame';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import useSocket from '../../socket';
import { useState, useEffect } from 'react';

export default function CreateGame() {
  const nav = useNavigate();
  const socket = useSocket();
  const {game , setGame} = useGameStore(state => ({
    game: state.game,
    setGame: state.setGame
  }));
  const [connect, setConnect] = useState(false);

  const [roomNumber, setRoomNumber] = useState(null); // State to store the received room number

  const { game, setGame } = useGameStore(state => ({
    game: state.game,
    setGame: state.setGame
  }));


  useEffect(() => {
    // Listen for the roomNumber event
    socket.on('roomNumber', (roomNumber) => {
      setRoomNumber(roomNumber);
    });

    socket.emit('game:data', game);

    socket.on('game:join-success',()=>{
      console.log("התחברת")
      nav('/choose')
    })

    // Clean up event listener
    return () => {
      socket.off('roomNumber');
    };
  }, [socket]);





  return (
    <div className={styles.createContainer}>
      <BackArrow />
      <Frame>
        <h1>Your Code: {roomNumber}</h1> 
      </Frame>
      {/* <h1>Send message</h1>
      <a href='https://wa.link/lime1k' target='_blank'>This is your link</a> */}
      <div className={styles.loader}></div>
      { connect ? 
      <Button>
        <h2 onClick={() => nav('/choose')}>Choose Shape</h2>
      </Button> : 
     <h1>Waiting for opponent</h1> }
    </div>
  );
}
