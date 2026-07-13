import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyUser = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3000/verify",
                {
                    withCredentials: true,
                }
            );

            if (res.data.status) {
                setIsLoggedIn(true);
                setUser(res.data.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (err) {
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            setIsLoggedIn(false);
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                loading,
                verifyUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};