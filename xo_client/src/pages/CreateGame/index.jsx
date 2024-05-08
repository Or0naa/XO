import React from 'react'
import BackArrow from '../../components/BackArrow'
import Frame from '../../components/Frame'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'



export default function CreateGame() {
  const nav = useNavigate()
 
  return (
    <div className={styles.createContainer}>
    
      <BackArrow />
   
    
      <Frame>
        Your Code
        </Frame>
        <h1>Send message</h1>
      <a href='https://wa.link/lime1k' >This is your link </a> 
      <h1>Scan Barcode</h1>
      <img src='./barcodeliraz.png'></img>
       <div className={styles.loader}></div>

        waiting for oponent
        <Button>
        <h2 onClick={()=>nav('/choose')}>Choose Shape</h2></Button>
    </div>
  )
}
