import React from 'react'
import style from './style.module.scss'
import Button from '../../components/Button'
import logo from '../../logo.png'
import { useNavigate } from 'react-router-dom';



export default function Menu() {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/game');
      };

   
    return (
        <div className={style.menu}>
            <img src={logo}></img>
            <div className={style.buttons}>
                <Button handleClick={handleClick} > Play Solo
                    {/* computer game */}
                </Button>
                <Button> Play With A Friend
                    {/* join game */}
                </Button>
           
            </div>
        </div>
    )
}
