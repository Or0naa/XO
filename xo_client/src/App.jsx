import Board from "./components/Board";
import JoinGame from "./pages/JoinGame";
import Menu from "./pages/Menu";
import PlayerDetails from "./pages/PlayerDetails";
import Welcome from "./pages/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Winning from "./pages/Winning";
import Waiting from "./pages/Waiting";
import GameBoard from "./pages/GameBoard";

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
    path: "/player",
    element: <PlayerDetails />,
  },
  {
    path: "/win",
    element: <Winning />,
  },
  {
    path: "/waiting",
    element: <Waiting />,
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
