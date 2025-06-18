import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminMobileNav from "./AdminMobileNav"; // You'll create this

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Desktop Sidebar */}
            <div className="flex flex-1">
                <div className="hidden md:flex h-screen fixed">
                    <AdminSidebar />
                </div>

                <main className="flex-1 p-4 md:ml-64">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 w-full z-50 bg-white border-t shadow-md">
                <AdminMobileNav />
            </div>
        </div>
    );
};

export default AdminLayout;
