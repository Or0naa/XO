import React from 'react'
import { useState } from 'react'
import Frame from '../../components/Frame'
import styles from './style.module.scss'
import BackArrow from '../../components/BackArrow'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../store'
import { FiCheck } from 'react-icons/fi'
export default function PlayerDetails({ playerType }) {

  const nav = useNavigate()

  const { game } = useGameStore(state => ({
      game: state.game
  }))

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const handleChange = (e) => {
      setName(e.target.value);
  };

  const handleGoBack = () => {
      nav('/menu')
  }

  const imagesToChoose = ["./female.png", "./male.png", "./taltalaz.bmp", "./Woman.bmp", "./man.bmp"]
  const [chosenPhoto, setChosenPhoto] = useState("./taltalaz.bmp")

  const choosePhoto = (image) => {
      setChosenPhoto(image)
  };

  const handleLetsPlay = () => {

      if (playerType === 'user') {
        console.log("user")
        
      } else {
      console.log("opponent")
      }
      nav('/game')
  }

  return (
      <div className={styles.playerDetails}>
          <div>
              <img className={styles.logo} src='./logo.png' alt="" />
          </div>
          <Frame>
              <input className={styles.input} onChange={handleChange} type="text" placeholder='Enter your Name' />
          </Frame>
          <div>
              'CHOOSE AVATAR'
          </div>
          <div className={styles.imagesToChoose}>
              {imagesToChoose.map((image, index) => (
                  <div key={index} onClick={() => choosePhoto(image)}>
                      <img src={image} alt={image} className={chosenPhoto === image ? styles.chosenPhoto : styles.photo} />
                  </div>
              ))}
          </div>

          <div className={styles.back}>
              <BackArrow handleGoBack={handleGoBack} />
              <button onClick={handleLetsPlay}>
                  {<FiCheck className={styles.backArrow} />}
              </button>
          </div>

      </div>
  )
}

