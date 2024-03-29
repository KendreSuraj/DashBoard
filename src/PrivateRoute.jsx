import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ Component }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("userData")));
    const localToken = JSON.parse(localStorage.getItem("userData"))
    const verifyToken = async () => {
        const res = await axios.get(`${apiUrl}/api/v1/auth/is-logged-in?userId=${localToken?.user.id}&role=${localToken?.user.role}&token=${localToken?.token}`)
        if (res.data?.isLoggedIn) {
            setIsAuthenticated(res.data?.isLoggedIn)

        } else {
            setIsAuthenticated(res.data?.isLoggedIn)
            localStorage.removeItem("userData")
        }
    }
    useEffect(() => {
        isAuthenticated && verifyToken()
    }, [Component])

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;
