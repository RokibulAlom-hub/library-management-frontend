import Footer from "@/Pages/Footer/Footer";
import Navbar from "@/Pages/Navbar/Navbar";
import { Outlet } from "react-router";

export const Homelayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

