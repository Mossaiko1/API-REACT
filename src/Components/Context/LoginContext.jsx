// Context/LoginContext.js
import { createContext, useState, useContext } from "react";

export const UseLoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    const onLoginAccess = (loginData) => {
        setLogin(loginData);
        setIsLogin(true);
    };

    const onLogOut = () => {
        setLogin(null);
        setIsLogin(false);
    };

    const isAuthenticated = () => {
        return isLogin && login !== null;
    };

    return (
        <UseLoginContext.Provider value={{ onLoginAccess, login, isLogin, onLogOut, isAuthenticated }}>
            {children}
        </UseLoginContext.Provider>
    );
};

export const useAuth = () => useContext(UseLoginContext);
