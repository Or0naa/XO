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
    const { setGame } = useGameStore(
        state => ({
            setGame: state.setGame
        })
    );

 

    const navigate = useNavigate();

    const handleClick = () => {
        setGame({ ...game, gameType: "computer" })
        navigate('/choose');
    }
    const joinGame = () => {
        setGame({ ...game, gameType: "friend" })

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
