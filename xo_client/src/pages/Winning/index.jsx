import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import styles from './style.module.scss';
import Button from '../../components/Button';
import { useNavigate} from 'react-router-dom';

export default function Winning({ winner, restartGame }) {
  const nav = useNavigate();

  // Add confetti effect when the component mounts
  useEffect(() => {
    return () => {
      // Clean up any confetti effect when the component unmounts
    };
  }, []);

  return (
    <div className={styles.winning}>
      {/* Confetti animation */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      
      {/* Winning message and buttons */}
      <h2>{winner} wins!</h2>
      <Button handleClick={restartGame}>Play Again</Button>
      <Button handleClick={() => nav('/menu')}>Back to Menu</Button>
    </div>
  );
}