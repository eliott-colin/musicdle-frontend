import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Game from "../pages/Game.jsx";
import RegisterForm from "../pages/RegisterForm.jsx";
import ConnexionForm from "../pages/ConnexionForm.jsx";
import Error from "../pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: < Home /> },
      { path: "/game/:id", element: <Game /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/login", element: <ConnexionForm />}
    ]
  }
],
{ basename: "/musicdle/" },);

export default router;