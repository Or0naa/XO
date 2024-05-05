import React from 'react'
import BackArrow from '../../components/BackArrow'
import Title from '../../components/Title'
import Frame from '../../components/Frame'
import Button from '../../components/Button'

export default function JoinGame() {
  return (
    <div>
        <BackArrow/>
        <Title>
            Join A Game
            </Title>
        <Frame>
            <h1>Join Game</h1>
        </Frame>
        <Button>
            Join
        </Button>
    </div>
  )
}
