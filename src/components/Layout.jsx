import React, { Children } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";



const Layout = ({ children }) => {

    return (
        <div>
            <Navbar />
            <main>{children}</main>
            {/* maybe remove children if something goes wrong */}
            {/* outlet makes us place different components in the parent layout */}
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;