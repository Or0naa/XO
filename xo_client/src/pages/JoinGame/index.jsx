import React from 'react'
import BackArrow from '../../components/BackArrow'
import Title from '../../components/Title'
import Frame from '../../components/Frame'
import Button from '../../components/Button'
import CreateGame from '../../pages/CreateGame'

export default function JoinGame() {
  return (
    <div>
      <BackArrow />
      <Title>
        Join A Game
      </Title>
      <Frame>
        <h1>Join Game</h1>
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
