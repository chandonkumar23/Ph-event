import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Main/Main";
import Signup from './../Components/SignUpForm/Signup';
import Home from "../Components/Hero/Home";
import Events from "../Components/Events/Events";
import AddEvent from "../Components/AddEvent/AddEvent";
import MyEvent from './../Components/MyEvent/MyEvent';
import PrivateRoute from "../Components/PrivetRoute/PrivetRoute";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path:'/',
                element:<Home></Home>

            },
            {
                path:'signup',
                element:<Signup />
            },
            {
                path:'events',
                element:<PrivateRoute> <Events /> </PrivateRoute>
            },
            {
                path:'myEvent',
                element:<MyEvent />
            },
            {
                path:'addEvent',
                element:<AddEvent/>
            }
        ]

    }

])



export default router;