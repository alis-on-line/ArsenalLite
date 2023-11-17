import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Component/Dashboard/Dashboard";
import PlayerAdd from "../Component/Player/PlayerAdd";
import PlayerEdit from "../Component/Player/PlayerEdit";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {path: 'Dashboard', element: <Dashboard />},
      {path: 'AddPlayer', element: <PlayerAdd />},
      {path: 'EditPlayer', element: <PlayerEdit />}
    ]
  }
]

export const router = createBrowserRouter(routes);