import React from 'react'
import O_index from '../../components/XO/O_index'
import X_index from '../../components/XO/X_index'
import logo from '../../logo.png'
import style from './style.module.scss'

export default function Welcome() {
  return (
    <div className={style.welcome} >
       <div className={style.ow1}> <O_index /></div>
       <div className={style.ow2}><X_index /></div>
    
        <img src={logo}></img>
        <div className={style.ow3}><X_index /></div>
        <div className={style.ow4}> <O_index /></div>
       
       
    </div>
  )
}
