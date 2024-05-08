import React, { useState } from 'react'
import Frame from '../Frame'

export default function GrayXO({sigh}) {
    const [sigh, setSigh] = useState('');
  return (
    <div>
        <Frame>
{sigh}
        </Frame>
    </div>
  )
}
