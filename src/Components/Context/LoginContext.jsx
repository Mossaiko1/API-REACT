import { createContext, useState } from "react";

export const UseLoginContext = createContext();

export const LoginContext = ({ children }) => {
    
    const [login, setLogin] = useState(null)
    const [isLogin, setIsLogin] = useState(false)

    const onLoginAccess = (loginData) => {
        setLogin(loginData)
        setIsLogin(true)
    }

    const onLogOut = () => {
        setLogin(null)
        setIsLogin(false)
    }
    return (
        <UseLoginContext.Provider value={{ onLoginAccess, login, isLogin, onLogOut }}>
            {children}
        </UseLoginContext.Provider>
    )
}
