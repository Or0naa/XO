import React from 'react'
import styles from './style.module.scss';

export default function Frame({ children }) {
  return (
    <div className={styles.frame}>
      {children}
    </div>
  )
}
