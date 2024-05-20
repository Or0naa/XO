// import { createContext, useContext } from 'react'
// import io from 'socket.io-client'

// const socket = io('http://10.0.1.25:3000')
// const socketContext = createContext(io())
// export const SocketProvider =
//     ({ children }) => <socketContext.Provider value={socket}>{children}</socketContext.Provider>
// const useSocket = () => useContext(socketContext)

// export default useSocket;

import {io} from 'socket.io-client'

const URL = 'http://localhost:3001'
export const socket = io(URL,{
  // autoConnect: false,
})