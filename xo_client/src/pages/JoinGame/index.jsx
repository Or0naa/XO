import React from 'react'
import BackArrow from '../../components/BackArrow'
import Title from '../../components/Title'
import Frame from '../../components/Frame'
import Button from '../../components/Button'
import CreateGame from '../../pages/CreateGame'
import style from './style.module.scss'


export default function JoinGame() {
  return (
    <div>
      <BackArrow />
      <Title>
        Join A Game
      </Title>
      <Frame>
        <div >
        <input className={style.join} type="text" placeholder='Enter code game' /></div>
      </Frame>
      <Button>
        Join
      </Button>
      <hr />
      <button>
        <CreateGame />
        Create Game
      </button>
    </div>
  )
}
