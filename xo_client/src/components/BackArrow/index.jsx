import React from 'react'
import styles from './style.module.scss';
import { PiArrowArcLeftDuotone } from "react-icons/pi";

export default function BackArrow({handleGoBack}) {


  return (
    <div className={styles.backArrowContainer}>
      <button onClick={handleGoBack}>  <PiArrowArcLeftDuotone className={styles.backArrow} /></button>
    </div>
  )
}
