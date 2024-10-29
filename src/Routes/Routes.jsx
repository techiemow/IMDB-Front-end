// Routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Components/Movies/Home";
import Login from "../Accounts/Login";
import SignUp from "../Accounts/Signup";
import AddMovieForm from "../Components/Movies/AddMovie";
import ActorsHome from "../Components/Actors/ActorsHome";
import AddNewActor from "../Components/Actors/AddNewActor";
import AddProducer from "../Components/Producers/AddProducer";
import ProducerHome from "../Components/Producers/ProducerHome";
import MovieDetails from "../Components/Movies/MovieDetails";
import ActorsDetails from "../Components/Actors/ActorsDetails";
import ProducerDetails from "../Components/Producers/ProducerDetails";

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
            },
            {
                  path:"/movie/:id",
                  element:<MovieDetails />
            },
            {
                path:"/ActorsHome",
                element:<ActorsHome />
            },
            {
                path:"/AddNewActor",
                element:<AddNewActor />
            },
            {
                path:"/actor/:id",
                element:<ActorsDetails />
                   
            },
            {
                path:"/ProducersHome",
                element:<ProducerHome />
            },

            {
                path:"/AddNewProducer",
                element:<AddProducer />
            },
            {
                path:"/producer/:id",
                element:<ProducerDetails/>
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
