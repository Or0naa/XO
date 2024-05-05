import React from 'react'
import style from './style.module.scss'
import Button from '../../components/Button'
import logo from '../../logo.png'

export default function Menu() {
    return (
        <div className={style.menu}>
            <img src={logo}></img>
            <div className={style.buttons}>
            <Button> Play Solo
            </Button>
            <Button> Play With A Friend
            </Button>
</div>
        </div>
    )
}
