import { Outlet , Navigate, useLocation } from "react-router-dom";
import {jwtDecode } from 'jwt-decode'; // Thư viện để giải mã token JWT
import { useState , useEffect } from "react";

const PrivateRouter = ({ element }) => {
    const location = useLocation();
    const [isAdmin , setisAdmin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('login');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    const loginAdmin = decodedToken.role.includes("USER");
                    setisAdmin(loginAdmin);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []); // Passing an empty dependency array ensures the effect runs only once
    
    return (
        isAdmin ? <Outlet/> : <Navigate to="/login" replace state={{from : location}} /> 
    )
}

export default PrivateRouter