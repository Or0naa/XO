import { useEffect, useState } from 'react';
import style from './style.module.scss'
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useUserStore, useOponentStore } from '../../store';
import useSocket from '../../socket';


export default function PlayerView({ playerType, player }) {

    const socket = useSocket();


    const { user } = useUserStore(
        state => ({
            user: state.user
        }));

    const { opponent } = useOponentStore(
        state => ({
            opponent: state.opponent
        })
    );

    const { setUser } = useUserStore(
        state => ({
            setUser: state.setUser
        })
    );

    const { setOpponent } = useOponentStore(
        state => ({
            setOpponent: state.setOpponent
        })
    );

    useEffect(() => {
        socket.on('updatedDetails', (data) => {
          console.log('updatedDetails', data);
          const { updatedDetails, playerType } = data;
          if (playerType === 'user') {
            setUser({ ...user, ...updatedDetails });
          } else {
            setOpponent({ ...opponent, ...updatedDetails });
          }
        });
      
        return () => {
          socket.off('updatedDetails');
        };
      }, [socket, user, opponent, setUser, setOpponent]);

    console.log({ user, opponent });

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
