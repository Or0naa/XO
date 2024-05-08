import React from 'react'
import Frame from '../../components/Frame'
import styles from './style.module.scss'
import BackArrow from '../../components/BackArrow'
import { NavLink } from'react-router-dom'
import {useUserStore} from '../../store'
export default function PlayerDetails() {

    const {user, setUser} = useUserStore(
        (state) => ({
            user: state.user,
            setUser: state.setUser
        })
    )

    const handleChange = (e) => {
        setUser({ name: e.target.value });
    };
  
    return (
        <div className={styles.playerDetails}>
            <nav>
          <NavLink to="/menu">
      <BackArrow />
     </NavLink>
           </nav>
            <img src='./logo.png' alt="" />
            <Frame>
            <input onChange={handleChange} type="text" placeholder='Enter Player Name' />
            </Frame>
            <Frame>
                Choose Player
            </Frame>
            <img src='./male.png'></img>
            <img src='./female.png'></img>
        </div>
    )
}
