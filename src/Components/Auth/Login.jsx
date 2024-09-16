import { useContext, useState } from "react";
import useHook from "./Hooks/Hooks";
import { UseLoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navegar = useNavigate();
    const loginLocalStorage = JSON.parse(localStorage.getItem("Ingreso"));
    const { onLoginAccess } = useContext(UseLoginContext);
    const { onSubmit } = useHook();

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    const onLogin = (e) => {
        e.preventDefault();
        if (!loginLocalStorage) {
            alert("No se encontraron datos de inicio de sesión en el almacenamiento local.");
        } else if (correo === loginLocalStorage.correo && contrasena === loginLocalStorage.contrasena) {
            onLoginAccess(loginLocalStorage);
            navegar("/Dashboard", {
                replace: true
            });
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
        onSubmit();
    };

    return (
        <>
            <div>
                <h2>Inicio sesión</h2>
                <form action="" onSubmit={onLogin}>
                    <div>
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input
                            type="text"
                            name="correo"
                            autoComplete="off"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            type="password"
                            name="contrasena"
                            autoComplete="off"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Acceder</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;