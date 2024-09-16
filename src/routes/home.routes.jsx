import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UseLoginContext } from "../Components/Context/LoginContext";

const HomeRouter = () => {
    const { login, isLogin, onLogOut } = useContext(UseLoginContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    
                    <Link className="navbar-brand" to="/">
                        <img
                            src="/path-to-your-logo/logo.png" // Cambia este path a la ruta de tu logo
                            alt="App Logo"
                            width="30"
                            height="30"
                            className="d-inline-block align-text-top me-2"
                        />
                        AppEvaluate
                    </Link>
                    <button
                        className="navbar-toggler"
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!isLogin && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to="/Services">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Contacts">Contacts</Link>
                            </li>
                            {isLogin && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                                </li>
                            )}
                            {!isLogin && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Login">Log In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Register">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        {isLogin && (
                            <div className="d-flex align-items-center">
                                <span className="me-3">{login.name}</span>
                                <button className="btn btn-outline-danger" onClick={onLogOut}>Log Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <Outlet />
            </div>
        </>
    );
};

export default HomeRouter;
