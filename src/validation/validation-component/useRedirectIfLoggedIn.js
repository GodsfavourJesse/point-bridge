// useRedirectIfLoggedIn.js
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const useRedirectIfLoggedIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/dashboard");
        }
        });

        return () => unsub();
    }, [navigate]);
};

export default useRedirectIfLoggedIn;
