// components/sidebar/Sidebar.jsx
import React, { useEffect, useState } from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarSocials from './SidebarSocials'
import Logout from "../../components/Logout";
import SidebarAccount from "./SidebarAccount";

const Sidebar = ({ isMobile = false}) => {

    if (isMobile) {
        return (
            <aside className="flex md:hidden w-full h-16 bg-white border-t shadow-inner items-center justify-around px-2">
                <SidebarNav isMobile />
            </aside>
        )
    }

    return (
        <aside className="hidden md:flex flex-col w-full h-screen bg-white shadow-lg p-6 justify-between">
            <div>
                <SidebarLogo />
                <SidebarAccount />

                <div className="mt-5">

                    <SidebarNav />
                </div>
            </div>
            <div>
                <SidebarSocials />
                <Logout />
            </div>
        </aside>
    );
};

export default Sidebar;
