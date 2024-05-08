import React, { useState } from 'react';
import styles from './style.module.scss';
import GrayXO from '../../components/GrayXO';
import Frame from '../../components/Frame';
import BackArrow from '../../components/BackArrow';
import Button from '../../components/Button';
import { FiSettings } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function ChoosePlayer() {

    const nav = useNavigate();
  const [chosenSign, setChosenSign] = useState(null);

  const handleSignClick = (sign) => {
    if (sign === chosenSign) {
      return;
    }
    setChosenSign(sign === chosenSign ? null : sign);
  };

  return (
    <div className={styles.bigcontainer}>
    <BackArrow />
        <div className={styles.settings}>
            <button onClick={()=>nav('/player')}><FiSettings/></button></div>
 
    <div className={styles.container}>
      <h2 className={styles.choose}>Choose Player</h2> 
      <Frame>
     <div className={styles.buttonContainer}>   
        <div
          className={`${styles.signButton} ${chosenSign === 'X' ? styles.selected : ''}`}
          onClick={() => handleSignClick('X')}
        >
          <GrayXO sign="X" chosen={chosenSign === 'X'} />
        </div>
        <div
          className={`${styles.signButton} ${chosenSign === 'O' ? styles.selected : ''}`}
          onClick={() => handleSignClick('O')}
        >
          <GrayXO sign="O" chosen={chosenSign === 'O'} />
        </div>
      </div></Frame>
      <br/>
  <Button handleClick={() => nav('/game')}>
    <h2>Let's Play</h2></Button> </div>
   
   </div>
  );
}