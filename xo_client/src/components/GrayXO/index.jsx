import React from 'react';
import styles from './style.module.scss';
import Frame from '../Frame';
import O_index from '../XO/O_index';
import X_index from '../XO/X_index';

export default function GrayXO({ sign, chosen }) {
  return (
    <div className={styles.container}>
    <Frame> 
      <div className={styles.sign}>
        {sign === 'X' ? (
          <div className={`${styles.letter} ${chosen ? styles.bigger : ''}`}>
            <div className={`${styles.letter} ${!chosen ? styles.gray : ''}`}>
              <X_index isActive={chosen}/>
            </div>
          </div>
        ) : (
          <div className={`${styles.letter} ${chosen ? styles.bigger : ''}`}>
            <div className={`${styles.letter} ${!chosen ? styles.gray : ''}`}>
              <O_index isActive={chosen}/>
            </div>
          </div>
        )}
      </div>
    </Frame>
    </div>
  );
}