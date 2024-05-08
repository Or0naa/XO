import React from 'react'
import BackArrow from '../../components/BackArrow'
import Title from '../../components/Title'
import Frame from '../../components/Frame'
import Button from '../../components/Button'
import style from './style.module.scss'
import { NavLink } from 'react-router-dom'


export default function JoinGame() {



  return (
    <div className={style.joinGame}>
      <nav>
        <NavLink to="/menu">
      <BackArrow className={style.back}/>
     </NavLink>
     </nav>
      <Title>
        Join A Game
      </Title>
      <Frame>
        <div >
        <input className={style.join} type="text" placeholder='Enter code game' /></div>
      </Frame>
    <div onClick={() => window.location.href = "/waiting"} className={style.littlejoin}>
      <Button >
        Join
      </Button>
  </div>
      <span>Or</span>
      <div onClick={() => window.location.href = "/create"}>
        <Button>
        Create Game
     </Button> 
    </div>
    </div>
  )
}
