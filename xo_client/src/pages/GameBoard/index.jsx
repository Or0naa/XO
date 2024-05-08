import React, { useState } from 'react';
import Board from '../../components/Board';
import style from './style.module.scss';
import Button from '../../components/Button';
import PlayerView from '../../components/PlayerView';
import Winning from '../Winning';
import { useNavigate } from 'react-router-dom';

export default function GameBoard() {
  const nav = useNavigate();

  const TicTacToeGame = () => {
    const [winner, setWinner] = useState(null);

    // Function to check if there's a winner
    const checkWinner = () => {
      // Logic to check for a winner
      // You should implement this logic based on your game board state
      // If a winner is found, setWinner(player) where player is 'X' or 'O'
    };

    // Function to restart the game
    const restartGame = () => {
      // Logic to reset the game board and state
      setWinner(null);
    };


    // Render winning component if there's a winner
    if (winner) {
      return (
        <Winning
          winner={winner}
          restartGame={restartGame}
        />
      );
    }

    return (
      <div className={style.gameBoard}>
        <div className={style.yellowLine}>
          <div className={style.orangeBack}></div>
          <div className={style.players}>
            <PlayerView jender="man" turn={true} winnings={"13"} sigh={"O"} name="Moshe" />
            <PlayerView jender="woman" turn={false} winnings={"13"} sigh={"X"} name="Liron" />
          </div>
        </div>
        <div className={style.boardContainer}>
          <Board />
        </div>
        <div className={style.btn}>
          {/* <NavLink to='/menu'> */}
          <Button handleClick={() => nav('/menu')}> Back</Button>
        </div>
      </div>
    );
  };

  return <TicTacToeGame />;
}
