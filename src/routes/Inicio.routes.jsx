import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UseLoginContext } from "../Components/Context/LoginContext";


const InicioRouters = () => {
    const { login, isLogin, onLogOut } = useContext(UseLoginContext)
    return (
        <>
            <div>
                <nav>
                    <ul>
                        <Link className="li" to="/"> Inicio</Link>
                        <Link className="li" to="/Servicio"> Servicio</Link>
                        <Link className="li" to="/Contacto"> Contacto</Link>
                        {!isLogin && <Link className="li" to="/Login"> Acceder </Link>}
                        {!isLogin && <Link className="li" to="/Register"> Registro</Link>}
                        {isLogin && <Link className="li" to="/Dashboard"> Dashboard</Link>}
                    </ul>
                    {isLogin ? (
                        <div>
                            <div>{login.nombre}</div>
                            <button onClick={onLogOut}>Salir</button>
                        </div>
                    ) : ""}
                </nav>
            </div>
            <Outlet />
        </>
    )
}
export default InicioRouters