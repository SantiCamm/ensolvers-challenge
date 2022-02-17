import { Navigate } from "react-router-dom"


const PrivateRoute = ({ defaultPath, outlet }) => {

    const isAuthenticated= !!localStorage.getItem("profile");
    return isAuthenticated ? <Navigate to={{ pathname: defaultPath }} /> : outlet
};

export default PrivateRoute;
