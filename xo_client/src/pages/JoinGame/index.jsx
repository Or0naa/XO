import React from 'react'
import BackArrow from '../../components/BackArrow'
import Title from '../../components/Title'
import Frame from '../../components/Frame'
import Button from '../../components/Button'
import style from './style.module.scss'
import { useEffect } from 'react'
import useSocket from '../../socket'


export default function JoinGame({connectToRoom}) {
  const socket = useSocket();
  const handleSubmit = (e) => {
    e.preventDefault(); 
    connectToRoom(e.target.roomNumber.value)
    socket.on('room-status',(msg)=>console.log(msg))
    socket.emit('room',e.target.roomNumber.value)
    console.log('Joining room:', e.target.roomNumber.value)
  }


  return (
    <div className={style.joinGame}>
   
      <BackArrow className={style.back}/>
   
      <Title>
        Join A Game
      </Title>
      <Frame>
        <form onSubmit={handleSubmit}>
        <input className={style.join} type="text" placeholder='Enter code game' name="roomId"/></form>
      </Frame>
    <div onClick={() => window.location.href = "/waiting"} className={style.littlejoin}>
      <button >
        Join
      </button>
  </div>
      <span>Or</span>
      <div onClick={() => window.location.href = "/create"}>
        <Button>
        Create Game
     </Button> 
    </div>
    </div>
  )
}
