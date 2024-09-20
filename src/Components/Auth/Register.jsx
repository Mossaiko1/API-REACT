import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHook from "./Hooks/Data";
import '../../styles/register.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onHandleChange, onSubmit } = useHook();

    const onRegister = (e) => {
        e.preventDefault();
        onHandleChange({ name, email, password });
        navigate("/Login", { replace: true });
        onSubmit();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card">
                <h2 className="text-center">Registrarse</h2>
                <form onSubmit={onRegister}>
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
                    <div className="d-grid">
                        <button type="submit" className="btn">Registrarse</button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-link"
                        onClick={() => navigate("/Login", { replace: true })}
                    >
                        ¿Ya tienes una cuenta? Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
