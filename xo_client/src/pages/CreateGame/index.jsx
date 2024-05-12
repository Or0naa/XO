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

  const [roomNumber, setRoomNumber] = useState(null); // State to store the received room number


  useEffect(() => {
    // Listen for the roomNumber event
    socket.on('roomNumber', (roomNumber) => {
      setRoomNumber(roomNumber);
    });

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
      <h1>Send message</h1>
      <a href='https://wa.link/lime1k' target='_blank'>This is your link</a>
      <div className={styles.loader}></div>
      Waiting for opponent
      <Button>
        <h2 onClick={() => nav('/choose')}>Choose Shape</h2>
      </Button>
    </div>
  );
}
