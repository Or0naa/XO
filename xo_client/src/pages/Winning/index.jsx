import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import styles from './style.module.scss';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';
import Frame from '../../components/Frame';
import X_index from '../../components/XO/X_index';
import O_index from '../../components/XO/O_index';

export default function Winning({ winner }) {
  const nav = useNavigate();
  const { game, setGame } = useGameStore(
    state => ({
      game: state.game,
      setGame: state.setGame
    })
  );

  const restartGame = ()=>{
    setGame({
      win: false,
      winner: null,
      board: [],
      squares: 3,
      currentPlayer:  'X',
      gameType: 'computer'
    })
    nav('/game')
  }

  // Add confetti effect when the component mounts
  useEffect(() => {
    return () => {
      // Clean up any confetti effect when the component unmounts
    };
  }, []);

  const isXwin = game.winner == 'X';
  const isOwin = game.winner == 'O';
  console.log("x",isXwin,'o',isOwin)


  return (
    <div className={styles.winning}>
      {/* Confetti animation */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      {/* Winning message and buttons */}
      <h2>{game.winner} wins!</h2>
      <Frame>
        <div className={styles.board}>
          {game.board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.board_row}>
              {row.map((cell, cellIndex) => (
                <Frame>
                  <div key={cellIndex} className={cell.value==game.winner ? styles.square_frame : styles.gray}>
                    {cell.value == "X" ? <X_index isActive={isXwin} /> : cell.value == "O" ? <O_index isActive={isOwin} /> : ""}
                  </div>
                </Frame>
              ))}
            </div>
          ))}</div>
      </Frame>
      <Button handleClick={restartGame}>Play Again</Button>
      <Button handleClick={() => nav('/menu')}>Back to Menu</Button>
    </div>
  );
}