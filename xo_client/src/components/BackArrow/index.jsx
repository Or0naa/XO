import React from 'react'
import styles from './style.module.scss';
import { PiArrowArcLeftDuotone  } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


export default function BackArrow() {

 const nav = useNavigate()
const handleGoBack = () => {
nav(-1);
}

  return (
    <div className={styles.backArrowContainer}>
      <button onClick={handleGoBack}>  <PiArrowArcLeftDuotone className={styles.backArrow} /></button>
    </div>
  )
}