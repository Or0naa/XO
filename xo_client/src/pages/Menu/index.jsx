import React from 'react'
import style from './style.module.scss'
import Button from '../../components/Button'
import logo from '../../logo.png'
import Board from '../../components/Board'
import Waiting from '../Waiting'

export default function Menu() {
    return (
        <div className={style.menu}>
            <img src={logo}></img>
            <div className={style.buttons}>
                <Button> Play Solo
                    {/* computer game */}
                </Button>
                <Button> Play With A Friend
                    {/* join game */}
                </Button>
           
            </div>
        </div>
    )
}
