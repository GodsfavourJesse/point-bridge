import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./validation/Login";
import Register from "./validation/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Redeem from "./pages/Redeem";
import Refer from "./pages/Refer"
import ResetConfirmation from "./validation/validation-component/ResetConfirmation";
import ForgotPassword from "./validation/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/Settings";
import About from "./pages/About";
import MainLayout from "./userDashboardComponents/MainAreaComponents/MainLayout";

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
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
