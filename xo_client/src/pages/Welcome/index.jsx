import React from 'react'
import O_index from '../../components/XO/O_index'
import X_index from '../../components/XO/X_index'
import style from './style.module.scss'
import { NavLink } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className={style.welcome}  >
      <nav>
      <NavLink to='/menu'>
       <div className={style.ow1}> <O_index /></div>
       <div className={style.ow2}><X_index /></div>
    
        <img src='./logo.png'></img>
        <div className={style.ow3}><X_index /></div>
        <div className={style.ow4}> <O_index /></div>
       
       </NavLink>
       </nav>
    </div>
  )
}
