import React from 'react'
import style from './style.module.scss'
import BackArrow from '../../components/BackArrow'
import { NavLink } from'react-router-dom'


export default function WaitingJoin() {


    return (
        <div className={style.hi}>
        
      <BackArrow />
    
            <div className={style.hand}></div>
            <div className={style.hand}></div>
            <div className={style.hand}></div>
            <div className={style.hand}></div>
            <div className={style.tree}></div>
            <div className={style.up}></div>

            <h1>Waiting..</h1>
            <h2>Join the game</h2>
        </div>
    )
}
