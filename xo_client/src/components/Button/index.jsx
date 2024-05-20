import React from 'react'
import styles from './style.module.scss';

export default function Button({children, handleClick}) {


  return (
    <div className={styles.buttonClass}>
        <button onClick={handleClick}>{children}</button>
        </div>
  )
}
