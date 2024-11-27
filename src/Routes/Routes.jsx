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

import UpdateMovie from "../Components/Movies/UpdateMovie";
import UpdateActor from "../Components/Actors/UpdateActor";
import UpdateProducer from "../Components/Producers/Updateproducer";
import TMDBSearch from "../Components/TMDB/TMDBSearch";
import PopularMovieInDetails from "../Components/Movies/PopularMovieInDetails";
import PopularActorInDetails from "../Components/Actors/PopularActorInDetails";
import FavoriteMovies from "../Components/Movies/FavoriteMovies";

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
                path:"/PopularMovieDetails/:id",
                element:<PopularMovieInDetails />
            },
            {
                path:"/favorites",
                element:<FavoriteMovies />
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
                    path:"/UpdateMovie/:id",
                    element:<UpdateMovie/>
                           
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
                path:"/PopularActorInDetails/:id",
                element:<PopularActorInDetails/>
            },
            {
                  path:"/UpdateActor/:id",
                  element:<UpdateActor />
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
            },
            {
                path:"/UpdateProducer/:id",
                element:<UpdateProducer/>
            },
            {
                path:"/Search",
                element:<TMDBSearch/>

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
