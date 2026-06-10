import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Game from "../pages/Game.jsx";
import RegisterForm from "../pages/RegisterForm.jsx";
import ConnexionForm from "../pages/ConnexionForm.jsx";
import Error from "../pages/Error.jsx";
import ResearchPage from "../pages/ResearchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "game/:id", element: <Game /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <ConnexionForm />},
      { path: "research", element: <ResearchPage />}
    ]
  }
],
{ basename: "/musicdle" },);

export default router;