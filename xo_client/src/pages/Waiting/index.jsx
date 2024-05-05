import React from 'react'
import style from './style.module.scss'


export default function Waiting() {
    return (
        <div className={style.hi}>
            <div className={style.hand}></div>
            <div className={style.hand}></div>
            <div className={style.hand}></div>
            <div className={style.hand}></div>
            <div className={style.tree}></div>
            <div className={style.up}></div>
        </div>
    )
}
