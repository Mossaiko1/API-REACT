import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UseLoginContext } from "../Components/Context/LoginContext";
import "../styles/home.routes.css";

const HomeRouter = () => {
    const { login, isLogin, onLogOut } = useContext(UseLoginContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img
                            src="https://img.freepik.com/fotos-premium/legendario-mr-monopoly-icono-atemporal-brillo-4k_1000124-345.jpg"
                            alt="Logo"
                            className="custom-logo me-3"
                        />
                        <span className="brand-text">Banco Personalizado</span>
                    </Link>
                    <button
                        className="navbar-toggler custom-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {!isLogin && (
                                <li className="nav-item">
                                    <Link className="nav-link custom-link" to="/">Inicio</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link custom-link" to="/Services">Servicios</Link>
                            </li>
                            {isLogin && (
                                <li className="nav-item">
                                    <Link className="nav-link custom-link" to="/Clients">Clientes</Link>
                                </li>
                            )}
                            {isLogin && (
                                <li className="nav-item">
                                    <Link className="nav-link custom-link" to="/Accounts">Cuentas</Link>
                                </li>
                            )}
                            {!isLogin && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-link" to="/Register">Regístrate</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-link" to="/Login">Iniciar sesión</Link>
                                    </li>

                                </>
                            )}
                        </ul>
                        {isLogin && (
                            <div className="d-flex align-items-center">
                                <span className="me-3 user-name">{login.name}</span>
                                <button className="btn custom-logout-btn" onClick={onLogOut}>Cerrar Sesión</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="container custom-container">
                <Outlet />
            </div>
        </>
    );
};

export default HomeRouter;
