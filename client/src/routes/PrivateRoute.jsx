import { Navigate } from "react-router-dom"


const PrivateRoute = ({ authenticationPath, outlet }) => {

    const isAuthenticated = !!localStorage.getItem("profile");
    return isAuthenticated ? outlet : <Navigate to={{ pathname: authenticationPath }} />
};

export default PrivateRoute;
