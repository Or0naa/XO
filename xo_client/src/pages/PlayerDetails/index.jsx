import React from 'react'
import logo from '../../logo.png'
import Frame from '../../components/Frame'
import styles from './style.module.scss'
import female from '../../components/PlayerView/female.png'
import male from '../../components/PlayerView/male.png'
import BackArrow from '../../components/BackArrow'
import { NavLink } from'react-router-dom'
export default function PlayerDetails() {

  
    return (
        <div className={styles.playerDetails}>
            <nav>
          <NavLink to="/menu">
      <BackArrow />
     </NavLink>
           </nav>
            <img src={logo} alt="" />
            <Frame>
                <input type="text" placeholder='Enter Player Name' />
            </Frame>
            <Frame>
                Choose Player
            </Frame>
            <img src={female}></img>
            <img src={male}></img>
        </div>
    )
}
