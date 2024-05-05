import React from 'react'
import styles from './style.module.scss';

export default function Button() {
const handleClick = () => {
    console.log('clicked')
}

  return (
    <div className={styles.buttonClass}>
        <button onClick={handleClick}>Button</button>
        </div>
  )
}
