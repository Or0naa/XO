import Board from "./components/Board";
import JoinGame from "./pages/JoinGame";
import Menu from "./pages/Menu";
import PlayerDetails from "./pages/PlayerDetails";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Winning from "./pages/Winning";
import WaitingJoin from "./pages/WaitingJoin";
import GameBoard from "./pages/GameBoard";
import CreateGame from "./pages/CreateGame";
import ChoosePlayer from "./pages/ChoosePlayer";

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
export default function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    
    </>
  )
}
