import React, { useState, useEffect } from 'react';
import Board from '../../components/Board';
import style from './style.module.scss';
import Button from '../../components/Button';
import PlayerView from '../../components/PlayerView';
import Winning from '../Winning';
import { useNavigate } from 'react-router-dom';
import useSocket from '../../socket';
import { useUserStore, useOponentStore } from '../../store';

export default function GameBoard() {
  const socket = useSocket();
  const { user } = useUserStore((state) => ({ user: state.user }));
  const { opponent } = useOponentStore((state) => ({ opponent: state.opponent }));
  const [gameState, setGameState] = useState({
    players: [user, opponent],
    board: Array(9).fill(null),
    currentTurn: 0,
  });

  useEffect(() => {
    socket.on('gameUpdate', (updatedGameState) => {
      setGameState(updatedGameState);
    });

    return () => {
      socket.off('gameUpdate');
    };
  }, [socket]);

  const handleMove = (index) => {
    const currentPlayer = gameState.players[gameState.currentTurn];
    if (currentPlayer.id === user.id) {
      socket.emit('move', { roomId, index });
    } else {
      console.log("It's the opponent's turn.");
    }
  };

  return (
    <div className={style.gameBoard}>
      <div className={style.yellowLine}>
        <div className={style.orangeBack}></div>
        <div className={style.players}>
          <PlayerView playerType="user" player={gameState.players[0]} />
          <PlayerView playerType="opponent" player={gameState.players[1]} />
        </div>
      </div>
      <div className={style.boardContainer}>
        <Board gameState={gameState} handleMove={handleMove} />
      </div>
    </div>
  );
};
