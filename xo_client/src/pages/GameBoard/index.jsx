import React from 'react'
import Board from '../../components/Board'
import style from './style.module.scss'
import Button from '../../components/Button'
import PlayerView from '../../components/PlayerView'
import { NavLink } from'react-router-dom'


export default function GameBoard() {
    return (
        <div className={style.gameBoard}>
            <div className={style.yellowLine}>
                <div className={style.orangeBack}>
                </div><div className={style.players}>
                    <PlayerView jender="man" turn={true} winnings={"13"} sigh={"O"} name="Moshe" />
                    <PlayerView jender="woman" turn={false} winnings={"13"} sigh={"X"} name="Liron" />
                </div>
            </div>
            <div className={style.boardContainer}>
                <Board /></div>
            <div className={style.btn}>
                <NavLink to='/menu'>
                    <Button> Back</Button></NavLink> </div>
        </div>
    )
}
