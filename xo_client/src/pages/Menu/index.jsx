import React from 'react'
import style from './style.module.scss'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';




export default function Menu() {
    const { game } = useGameStore(
        state => ({
            game: state.game,
        })
    );


 

    const navigate = useNavigate();

    const handleClick = () => {
        useGameStore.getState().setGameType("computer");
        console.log("game type", game.type);

        navigate('/choose');
    }
    const joinGame = () => {
        useGameStore.getState().setGameType("friend");


        navigate('/join');
    };


    return (
        <div className={style.menu}>
            <img src={'./logo.png'}></img>
            <div className={style.buttons}>
                <Button handleClick={handleClick} > Play Solo
                    {/* computer game */}
                </Button>
                <Button handleClick={joinGame}> Play With A Friend
                    {/* join game */}
                </Button>

            </div>
        </div>
    )
}
