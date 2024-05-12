import React from 'react'
import style from './style.module.scss'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';
import { useGameStore, useOponentStore } from '../../store';




export default function Menu() {
    const {game} = useGameStore(
        state => ({
            game: state.game,
        })
    );
    const {setGame} = useGameStore(
        state => ({
            setGame: state.setGame
        })
    );
    const { setOpponent } = useOponentStore(
        state => ({
            setOpponent: state.setOpponent
        })
    );
    const { opponent } = useOponentStore(
        state => ({
            opponent: state.opponent,
        })
    );

    const navigate = useNavigate();

    const handleClick = () => {
        setGame({ ...game, gameType: "computer" })
        setOpponent({
            opponent: { ...opponent,
                name: "Computer",
                avatar: "./robot.png",
            }
        });

        navigate('/choose');
    }
    const joinGame = () => {
        setGame({ ...game, gameType: "friend" })
        navigate('/join');
    };


    return (
        <div className={style.menu}>
            <img src='./logo.png'></img>
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
