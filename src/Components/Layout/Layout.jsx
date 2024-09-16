import Inicio from "../Pages/Inicio"
import Servicio from "../Pages/Servicio"
import Contacto from "../Pages/Contacto"
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Pages/Dashboard"
import InicioRouters from "../../routes/Inicio.routes";
import { Routes, Route } from "react-router-dom";


const Header = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<InicioRouters />}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Servicio" element={<Servicio />} />
                    <Route path="/Contacto" element={<Contacto />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Route>
            </Routes>
        </>
    );
}
export default Header