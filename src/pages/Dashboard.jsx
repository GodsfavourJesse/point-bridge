import { Outlet, useNavigate } from "react-router-dom";
import { auth, } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Sidebar from "../userDashboardComponents/SidebarComponents/Sidebar";
import MainLayout from "../userDashboardComponents/MainAreaComponents/MainLayout";
import { motion } from "framer-motion";


function Dashboard() {
    const navigate = useNavigate();

    // ✅ Redirect if not logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            navigate("/login");
        }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <motion.div 
            className="flex flex-col md:flex-row min-h-screen overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:block w-64 h-screen fixed top-0 left-0 bg-white shadow z-20"
            >
                <Sidebar />
            </motion.div>

            <motion.div
                className="flex-1 md:ml-64 overflow-y-auto mb-16 md:mb-0"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Outlet />
            </motion.div>

            {/* Mobile Footer Nav (acts as sidebar on small screens) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-30 h-16 flex items-center justify-around ">
                {/* You can reuse Sidebar icons here */}
                <Sidebar isMobile />
            </div>

        </motion.div>
       
    );
}

export default Dashboard;
