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
  const { game } = useGameStore(
    state => ({
      game: state.game,
    })
  )
  const { restartGame } = useGameStore()


  const restart = () => {
    useGameStore.getState().restartGame()
    nav('/game')
  }
  

  return (
    <div className={styles.winning}>
      {/* Confetti animation */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      {/* Winning message and buttons */}
      {game.winner == "Draw" ? <h2>Draw!</h2> : <h2>{game.winner} wins!</h2>}
      <Frame>
        <div className={styles.board}>
          {game.board.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.board_row}>
              {row.map((cell, cellIndex) => (
                <Frame>
                  <div key={cellIndex} className={cell.value == game.winner ? styles.square_frame : styles.gray}>
                    {cell.value == "X" ? <X_index isActive={cell.isWin} /> : cell.value == "O" ? <O_index isActive={cell.isWin} /> : ""}
                  </div>
                </Frame>
              ))}
            </div>
          ))}</div>
      </Frame>
      <Button handleClick={restart}>Play Again</Button>
      <Button handleClick={() => nav('/menu')}>Back to Menu</Button>
    </div>
  );
}