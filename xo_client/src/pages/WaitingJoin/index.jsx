import React from 'react';
import style from './style.module.scss';
import BackArrow from '../../components/BackArrow';

export default function WaitingJoin() {
    return (
      <div className={style.hi}>
        <BackArrow />
        <svg
          className={style.svg}
          viewBox="0 0 187.3 93.7"
          height="300px"
          width="400px"
        >
          <path
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            className={style.outline} // Change id to className
            stroke="#ffd414"
            strokeWidth="5"
            fill="none"
          ></path>
          <path
            d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
            className={style.outlineBg} // Change id to className
            stroke="#ffd414"
            fill="none"
            strokeWidth="5"
            opacity="0.05"
          ></path>
        </svg>
        <h1>Waiting..</h1>
        <h2>Join the game</h2>
      </div>
    );
  }