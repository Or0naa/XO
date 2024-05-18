import JoinGame from "./pages/JoinGame";
import Menu from "./pages/Menu";
import PlayerDetails from "./pages/PlayerDetails";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Winning from "./pages/Winning";
import WaitingJoin from "./pages/WaitingJoin";
import GameBoard from "./pages/GameBoard";
import CreateGame from "./pages/CreateGame";
import ChoosePlayer from "./pages/ChoosePlayer";
import { useGameStore } from "./store";

export default function App() {
  const handleGameUpdate = useGameStore(state => state.handleGameUpdate);

  useEffect(() => {
    handleGameUpdate();
  }, [handleGameUpdate]);
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
      element: <JoinGame />,
    },
    {
      path: "/create",
      element: <CreateGame />
    },
    {
      path: "/player",
      element: <PlayerDetails playerType="user" />,
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
      element: <PlayerDetails playerType="oponent" />,
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}