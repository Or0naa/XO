import React, { useState, useEffect } from 'react';
import BackArrow from '../../components/BackArrow';
import Title from '../../components/Title';
import Frame from '../../components/Frame';
import Button from '../../components/Button';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';


export default function JoinGame() {
  const nav = useNavigate();
  const { game } = useGameStore(state => ({
    game: state.game,
  }));


  const { createRoom } = useGameStore(
    state => ({
      createRoom: state.createRoom
    })
  );

  const { joinToRoom } = useGameStore(
    state => ({
      joinToRoom: state.joinToRoom
    })
  );

  const handleCreate=()=>{
    createRoom()
    nav('/create')
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = e.target.roomId.value;
    joinToRoom(roomId);
    nav('/game');
  };


  return (
    <div className={style.joinGame}>
      <BackArrow />
      <div className={style.title}>
        <Title >Join A Game</Title>
      </div>
      <form onSubmit={handleSubmit}> <Frame>

        <input className={style.join} type="text" placeholder="Enter code game" name="roomId" />

      </Frame> </form>
      <div className={style.littlejoin}>
        <button onClick={handleSubmit} >Join</button>
      </div>
      <span>Or</span>
      <div onClick={handleCreate}>
        <Button>Create Game</Button>
      </div>
    </div>
  );
}