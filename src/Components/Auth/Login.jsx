import { useContext, useState } from "react";
import Data from "../../Components/Auth/Hooks/Data";
import { UseLoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import '../../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const loginLocalStorage = JSON.parse(localStorage.getItem("user"));
    const { onLoginAccess } = useContext(UseLoginContext);
    const { onSubmit, onHandleChange } = Data();

    // Estados compartidos para Login y Register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // Estado para alternar entre Login y Register
    const [isRegister, setIsRegister] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        if (!loginLocalStorage) {
            alert("No se encontraron datos.");
        } else if (email === loginLocalStorage.email && password === loginLocalStorage.password) {
            onLoginAccess(loginLocalStorage);
            navigate("/Clients", { replace: true });
        } else {
            alert("El correo electrónico o la contraseña son incorrectos.");
        }
        onSubmit();
    };

    const onRegister = (e) => {
        e.preventDefault();
        onHandleChange({ name, email, password });
        navigate("/Login", { replace: true });
        onSubmit();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-sm border-0 p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">
                    {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
                </h2>
                <form onSubmit={isRegister ? onRegister : onLogin}>
                    {isRegister && (
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ingresa tu nombre completo"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Crea una contraseña"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {isRegister ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-link"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister
                            ? "¿Ya tienes una cuenta? Inicia sesión"
                            : "¿No tienes una cuenta? Regístrate"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;