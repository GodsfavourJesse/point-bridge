// components/sidebar/Sidebar.jsx
import React, { useEffect, useState } from "react";
import SidebarLogo from "./SideBarLogo";
import SidebarNav from "./SideBarNav";
import SidebarSocials from './SidebarSocials'
import Logout from "../../components/Logout";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
import SidebarAccount from "./SidebarAccount";

const Sidebar = () => {

    // const [user, setUser] = useState(null);
    // const [username, setUsername] = useState("");

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    //         setUser(currentUser);
    
    //         if (currentUser) {
    //             const userDocRef = doc(db, "users", currentUser.uid);
    //             const userDocSnap = await getDoc(userDocRef);
    //             if (userDocSnap.exists()) {
    //                 setUsername(userDocSnap.data().username || "");
    //             }
    //         }
    //     });
    
    //     return () => unsubscribe();
    // }, []);

    return (
        <aside className="hidden md:flex flex-col w-full h-screen bg-white shadow-lg p-6 justify-between">
            <div>
                <SidebarLogo />
                <SidebarAccount />
                {/* <p className="text-sm text-gray-600 mt-4 mb-4">
                    {user ? `Hi ${username}` : "Loading..."}
                </p> */}
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
