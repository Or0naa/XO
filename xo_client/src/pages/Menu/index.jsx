import React from 'react'
import style from './style.module.scss'
import Button from '../../components/Button'
import logo from '../../logo.png'
import { useNavigate } from 'react-router-dom';
import JoinGame from '../JoinGame';



export default function Menu() {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/game');
      };

      const joinGame = () => {
        navigate('/join');
      };

   
    return (
        <div className={style.menu}>
            <img src={logo}></img>
            <div className={style.buttons}>
                <Button handleClick={handleClick} > Play Solo
                    {/* computer game */}
                </Button>
                <Button handleClick={joinGame}> Play With A Friend
                    {/* join game */}
                </Button>
           
            </div>
        </div>
    )
}
