import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { Routes, Route } from "react-router-dom";
import Services from "../Pages/Services";
import Home from "../Pages/Home";
import HomeRouter from "../../routes/home.routes";
import PrivateRoute from "../../routes/PrivateRoutes";
import Error404 from "../Pages/Error404";
import Clients from "../Pages/clients";
import Accounts from "../Pages/Accounts";


const Header = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomeRouter />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/Clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
                    <Route path="/Accounts" element={<PrivateRoute><Accounts /></PrivateRoute>} />
                    <Route path="/Services" element={<Services />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
        </>
    );
}

export default Header;