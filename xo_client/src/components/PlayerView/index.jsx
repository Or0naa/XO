import { useState } from 'react';
import maleImg from './male.png';
import femaleImg from './female.png';
import style from './style.module.scss'
import X_index from '../XO/X_index';
import O_index from '../XO/O_index';


export default function PlayerView({ jender, name, turn, sigh, winnings }) {

    const [playerImg, setPlayerImg] = useState(jender === "man" ? maleImg : femaleImg);
    const [frameColor, setFrameColor] = useState(jender === "man" ? "blue" : 'green');


    return (

        <div className={turn ? style.turnPlyer : style.otherPlayer}>
            <img src={playerImg} alt="playerImg" style={{ borderColor: '#b58506', borderWidth: "3px", borderRadius: "50%", border: "solid" }} />
            <div className={style.playerInfo}>
                {sigh == 'X' ? <X_index /> : <O_index />}
                <span>wins: {winnings}</span>
            </div>
            <div className={style.playerName}>{name}</div>
        </div>
    );
}
