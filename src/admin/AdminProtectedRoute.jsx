// src/admin/AdminProtectedRoute.jsx
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { ADMIN_EMAILS } from '../config/adminConfig';

const AdminProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <div>Loading...</div>;
    if (!user || !ADMIN_EMAILS.includes(user.email)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminProtectedRoute;
