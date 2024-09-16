import { useState } from "react"
import useHook from "./Hooks/Hooks"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const navegar = useNavigate()
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")

    const { onHandleChange, onSubmit } = useHook();
    const onRegister = (e) => {
        e.preventDefault();
        onHandleChange({ nombre, correo, contrasena });
        navegar("/Login",{
            replace:true
        })
        onSubmit();
    }
    return (

        <>
            <div>
                <h2>Registro </h2>
                <form action="" onSubmit={onRegister}>
                    <div>
                        <label htmlFor="">Nombre Completo</label>
                        <input type="text" 
                        name="nombre" 
                        autoComplete="off"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required />
                    </div>
                    <div>
                        <label htmlFor="">Correo Electronico</label>
                        <input type="text" name="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="">Contraseña</label>
                        <input type="password" name="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                    </div>
                    <div>
                        <button>{" "}
                            Acceder</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Register;