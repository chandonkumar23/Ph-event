
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";



const Main = () => {
    return (
        <div>
             <Navbar/>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;