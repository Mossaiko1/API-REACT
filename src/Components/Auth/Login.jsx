import { useContext, useState } from "react";
import useHook from "./Hooks/Hooks";
import { UseLoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const loginLocalStorage = JSON.parse(localStorage.getItem("user"));
    const { onLoginAccess } = useContext(UseLoginContext);
    const { onSubmit } = useHook();

    // Estados compartidos para Login y Register
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // Estado para alternar entre Login y Register
    const [isRegister, setIsRegister] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        if (!loginLocalStorage) {
            alert("No data found.");
        } else if (email === loginLocalStorage.email && password === loginLocalStorage.password) {
            onLoginAccess(loginLocalStorage);
            navigate("/Dashboard", { replace: true });
        } else {
            alert("Email or password are incorrect.");
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">
                                {isRegister ? "Register" : "Log In"}
                            </h2>
                            <form onSubmit={isRegister ? onRegister : onLogin}>
                                {isRegister && (
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    {isRegister ? "Register" : "Log In"}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-link"
                                    onClick={() => setIsRegister(!isRegister)}
                                >
                                    {isRegister
                                        ? "Already have an account? Log In"
                                        : "Don't have an account? Register"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
