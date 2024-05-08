import React from 'react';
import styles from './style.module.scss';
import Frame from '../Frame';

export default function GrayXO({ sign, chosen }) {
  return (
    <div className={styles.sign}>
        <Frame>
    {sign === 'X' ? (
      <img
        src='./x.png'
        alt="X"
        className={`${styles.image} ${chosen ? styles.bigger : ''} ${!chosen ? styles.gray : ''}`}
      />
    ) : (
      <img
        src='./o.png'
        alt="O"
        className={`${styles.image} ${chosen ? styles.bigger : ''} ${!chosen ? styles.gray : ''}`}
      />
    )}</Frame>
  </div>
);
}