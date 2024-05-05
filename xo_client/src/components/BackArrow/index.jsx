import React from 'react'
import styles from './style.module.scss';
import { PiArrowArcLeftDuotone  } from "react-icons/pi";

export default function BackArrow() {
  return (
    <div className={styles.backArrowContainer}>
    <button>  <PiArrowArcLeftDuotone  className={styles.backArrow} /></button>  
    </div>
  )
}
