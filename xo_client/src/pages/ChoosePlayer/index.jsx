import React from 'react'
import styles from './style.module.scss';
import X_index from '../../components/XO/X_index'
import O_index from '../../components/XO/O_index'

export default function ChoosePlayer() {

  return (
    <>
    <div>Choose Player </div>
    <button><X_index/></button>
    <button><O_index/></button>
    </>
  )
}
