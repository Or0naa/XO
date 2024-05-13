import React, { useState, useEffect } from 'react';
import Board from '../../components/Board';
import style from './style.module.scss';
import PlayerView from '../../components/PlayerView';
import { useNavigate } from 'react-router-dom';
import { useGameStore} from '../../store';

export default function GameBoard() {

  const { game } = useGameStore(state => ({
    game: state.game
  }));

  console.log(game);
 

  return (
    <div className={style.gameBoard}>
      <div className={style.yellowLine}>
        <div className={style.orangeBack}></div>
        <div className={style.players}>
          <PlayerView playerType="user" player={game.players[0]} />
          <PlayerView playerType="opponent" player={game.players[1]} />
        </div>
      </div>
      <div className={style.boardContainer}>
        <Board />
      </div>
    </div>
  );
};
