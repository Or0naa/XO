import React from 'react'
import style from './style.module.scss';

export default function Title({children}) {
  return (
    <div className={style.title}>{children}</div>
  )
}
