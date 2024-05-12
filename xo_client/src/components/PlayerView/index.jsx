import { useEffect, useState } from 'react';
import style from './style.module.scss'
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';
import { useUserStore, useOponentStore } from '../../store';
import useSocket from '../../socket';


export default function PlayerView() {

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
        socket.on('userDetailsUpdated', (data) => {
            console.log('chageView', data);
            const { updatedDetails, playerType } = data;
            if (playerType === 'user') {
                setUser({ ...user, name: updatedDetails[name], avatar: updatedDetails[avatar] });
                console.log(updatedDetails)
            } else {
                setOpponent({ ...opponent, name: updatedDetails[name], avatar: updatedDetails[avatar] });
            }

        });
    }, [socket, user, opponent]);

    console.log({ user, opponent });

    return (
        <>
            <div className={style.player}>
                <img src={user.avatar} alt="playerImg" />
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
