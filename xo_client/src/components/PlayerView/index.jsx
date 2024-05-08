import { useState } from 'react';
import style from './style.module.scss'
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useUserStore, useOponentStore } from '../../store';


export default function PlayerView({ jender, name, turn, sigh, winnings }) {

    const { user } = useUserStore(
        state => ({
            user: state.user
        }));

    const { opponent } = useOponentStore(
        state => ({
            opponent: state.opponent
        })
    );

    return (
        <>
            <div className={style.player}>
                <img src={user.avatar} alt="playerImg"/>
                <div className={style.playerInfo}>
                    <div className={style.sigh}>
                        {user.sigh == 'X' ? <X_index /> : <O_index />}
                    </div>
                    <div className={style.wins}>wins: {user.wins}</div>
                </div>
                <div className={style.playerName}>{user.name}</div>
            </div>    
              <div className={style.player}>
                <img src={opponent.avatar} alt="playerImg" style={{ borderColor: 'black', borderWidth: "3px", borderRadius: "50%", border: "solid" }} />
                <div className={style.playerInfo}>
                    <div className={style.sigh}>
                        {opponent.sigh == 'X' ? <X_index /> : <O_index />}
                    </div>
                    <div className={style.wins}>wins: {opponent.wins}</div>
                </div>
                <div className={style.playerName}>{opponent.name}</div>
            </div>
        </>
    );
}
