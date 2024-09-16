import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UseLoginContext } from "../Components/Context/LoginContext";

const PrivateRoute = ({ children }) => {
    const { isLogin } = useContext(UseLoginContext);

    return isLogin ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
