import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./validation/Login";
import Register from "./validation/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Redeem from "./pages/Redeem";
import Refer from "./pages/Refer"
// import ResetConfirmation from "./validation/validation-component/ResetConfirmation";
import ForgotPassword from "./validation/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/Settings";
import About from "./pages/About";
import MainLayout from "./userDashboardComponents/MainAreaComponents/MainLayout";
import AdminLogin from "./admin/AdminLogin";
// import AdminRoute from "./admin/AdminRoute";
import UsersManager from "./admin/UsersManager";
import TasksManager from "./admin/TasksManager";
import WithdrawalsManager from "./admin/WithdrawalsManager";
import AdminProtectedRoute from './admin/AdminProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import AdminSettings from "./admin/AdminSettings";

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Register />} />

                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<MainLayout />} /> {/* /dashboard */}
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="redeem" element={<Redeem />} />
                        <Route path="about" element={<About />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="refer" element={<Refer />} />
                    </Route>

                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin/*"
                        element={
                            <AdminProtectedRoute>
                                <AdminLayout />
                            </AdminProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<TasksManager />} />
                        <Route path="users" element={<UsersManager />} />
                        <Route path="withdrawals" element={<WithdrawalsManager />} />
                        <Route path="settings" element={<AdminSettings />} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
