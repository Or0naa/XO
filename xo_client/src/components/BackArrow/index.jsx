import React from 'react'
import styles from './style.module.scss';
<<<<<<< HEAD
import { PiArrowArcLeftDuotone  } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

export default function BackArrow() {
const nav = useNavigate()

const handleGoBack = () => {
nav(-1);
}
=======
import { PiArrowArcLeftDuotone } from "react-icons/pi";

export default function BackArrow({handleGoBack}) {

>>>>>>> 270983d773053b2888048ee70a1c33c414109a5e

  return (
    <div className={styles.backArrowContainer}>
      <button onClick={handleGoBack}>  <PiArrowArcLeftDuotone className={styles.backArrow} /></button>
    </div>
  )
}
