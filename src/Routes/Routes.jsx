// Routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Components/Home";
import Login from "../Accounts/Login";
import SignUp from "../Accounts/Signup";
import AddMovieForm from "../Components/AddMovie";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                path:"/",
                element: <Home />,
            },
            {
                path:"/AddMovie",
                element:<AddMovieForm />
            }
        ]


    },
    {
        path:"/Login",
        element:<Login/>
    },
            
    {
      path:"/Register",
      element:<SignUp />
    },


]);

export default router;
