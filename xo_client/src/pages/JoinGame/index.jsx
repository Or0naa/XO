import React from 'react';
import BackArrow from '../../components/BackArrow';
import Title from '../../components/Title';
import Frame from '../../components/Frame';
import Button from '../../components/Button';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store';

export default function JoinGame() {
  const nav = useNavigate();
  const { createRoom, joinToRoom } = useGameStore(state => ({
    createRoom: state.createRoom,
    joinToRoom: state.joinToRoom
  }));

  const handleCreate = () => {
    createRoom();
    nav('/create');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = e.target.roomId.value;
    joinToRoom(roomId);
    nav('/oponent');
  };

  return (
    <div className={style.joinGame}>
      <BackArrow />
      <div className={style.title}>
        <Title>Join A Game</Title>
      </div>
      <form onSubmit={handleSubmit}>
        <Frame>
          <input className={style.join} type="text" placeholder="Enter code game" name="roomId" />
        </Frame>
        <div className={style.littlejoin}>
          <button type="submit">Join</button>
        </div>
      </form>
      <span>Or</span>
      <div onClick={handleCreate}>
        <Button>Create Game</Button>
      </div>
    </div>
  );
}
