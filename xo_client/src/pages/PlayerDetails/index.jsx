import React from 'react'
import logo from '../../logo.png'
import Frame from '../../components/Frame'
export default function PlayerDetails() {
    return (
        <div>
            <img src={logo} alt="" />
            <Frame>
                <input type="text" placeholder='Enter Player Name' />
            </Frame>
        </div>
    )
}
