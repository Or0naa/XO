import Board from "./components/Board";
import JoinGame from "./pages/JoinGame";
import Menu from "./pages/Menu";
import PlayerDetails from "./pages/PlayerDetails";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Winning from "./pages/Winning";
import WaitingJoin from "./pages/WaitingJoin";
import GameBoard from "./pages/GameBoard";
import CreateGame from "./pages/CreateGame";
import ChoosePlayer from "./pages/ChoosePlayer";
import { SocketProvider } from "./socket"


export default function App() {
  
  const [roomId, setRoomId] = useState(null)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/join",
      element: <JoinGame connectToRoom={setRoomId} roomId={roomId} />,
    },
    {path: "/create",
  element:<CreateGame/>
  },
    {
      path: "/player",
      element: <PlayerDetails />,
    },
    {
      path: "/choose",
      element: <ChoosePlayer />,
    },
    {
      path: "/win",
      element: <Winning />,
    },
    {
      path: "/waiting",
      element: <WaitingJoin />,
    },
    {
      path: "/game",
      element: <GameBoard />,
    },
  ]);
  return (
    <>
      <SocketProvider> <RouterProvider router={router} /></SocketProvider> 
    
    </>
  )
}
