import { useEffect, useState } from 'react';
import style from './style.module.scss'
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useGameStore } from '../../store';


export default function PlayerView({ playerType, player }) {



  const { game } = useGameStore(
    state => ({
      game: state.game
    }));



  const { setGame } = useGameStore(
    state => ({
      setGame: state.setGame
    })
  );


  return (
    <>
      <div className={style.player}>
        <img src={player.avatar} alt="playerImg" />
        <div className={style.playerInfo}>
          <div className={style.sigh}>
            {player.sigh === 'X' ? <X_index /> : <O_index />}
          </div>
          <div className={style.wins}>wins: {player.wins}</div>
        </div>
        <div className={style.playerName}>{player.name}</div>
      </div>
    </>
  );
}
