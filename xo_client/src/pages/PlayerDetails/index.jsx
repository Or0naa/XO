import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Frame from '../../components/Frame';
import BackArrow from '../../components/BackArrow';
import { useGameStore } from '../../store';
import { FiCheck } from 'react-icons/fi';
import styles from './style.module.scss';

export default function PlayerDetails({ playerType }) {
    const nav = useNavigate();

    const game = useGameStore(state => state.game);
    const user = useGameStore(state => state.user);
    const setGame = useGameStore(state => state.setGame);
    const handleGameUpdate = useGameStore(state => state.handleGameUpdate);

    const [name, setName] = useState("");
    const [chosenPhoto, setChosenPhoto] = useState("./taltalaz.bmp");

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleGoBack = () => {
        nav('/menu');
    };

    const imagesToChoose = ["./female.png", "./male.png", "./taltalaz.bmp", "./Woman.bmp", "./man.bmp"];

    const choosePhoto = (image) => {
        setChosenPhoto(image);
    };

    const handleLetsPlay = () => {
        if (game.type == "friend") {
            const playerIndex = game.players.findIndex(player => player.socketId === user);
            if (playerIndex !== -1) {
                const updatedPlayers = [...game.players];
                updatedPlayers[playerIndex] = { ...updatedPlayers[playerIndex], name: name, avatar: chosenPhoto };
                handleGameUpdate({ players: updatedPlayers });
                nav('/game');
            }
        }
        else {
            setGame({ ...game.players[0], name: name, avatar: chosenPhoto })
            nav('/game');
        }
    };

    return (
        <div className={styles.playerDetails}>
            <div>
                <img className={styles.logo} src='./logo.png' alt="" />
            </div>
            <Frame>
                <input className={styles.input} onChange={handleChange} type="text" placeholder='Enter your Name' />
            </Frame>
            <div>
                'CHOOSE AVATAR'
            </div>
            <div className={styles.imagesToChoose}>
                {imagesToChoose.map((image, index) => (
                    <div key={index} onClick={() => choosePhoto(image)}>
                        <img src={image} alt={image} className={chosenPhoto === image ? styles.chosenPhoto : styles.photo} />
                    </div>
                ))}
            </div>

            <div className={styles.back}>
                <BackArrow handleGoBack={handleGoBack} />
                <button onClick={handleLetsPlay}>
                    {<FiCheck className={styles.backArrow} />}
                </button>
            </div>
        </div>
    );
}
