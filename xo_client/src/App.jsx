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
import OponentDetails from "./pages/OponentDetails";

export default function App() {
  const [roomId, setRoomId] = useState(null);

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
      element: <JoinGame connectToRoom={(roomId) => {
        setRoomId(roomId);
        console.log('Connecting to room:', roomId);
      }} />,
    },
    {
      path: "/create",
      element: <CreateGame roomNumber={roomId} />
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
    {
      path: "/oponent",
      element: <OponentDetails />
    }
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
}