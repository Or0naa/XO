import React from 'react'
import Board from '../../components/Board'
import style from './style.module.scss'


export default function GameBoard() {
    return (
        <div className={style.gameBoard}>
            <div className={style.yellowLine}></div>
            <div className={style.boardContainer}>
            <Board /></div>
           <div className={style.btn}> <button>Back</button></div>
        </div>
    )
}
