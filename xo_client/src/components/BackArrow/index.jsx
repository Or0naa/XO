import React from 'react'
import styles from './style.module.scss';
import { PiArrowArcLeftDuotone  } from "react-icons/pi";

export default function BackArrow() {
const handleGoBack = () => {
  window.history.back();
}

  return (
    <div className={styles.backArrowContainer}>
    <button onClick={handleGoBack}>  <PiArrowArcLeftDuotone  className={styles.backArrow} /></button>  
    </div>
  )
}
