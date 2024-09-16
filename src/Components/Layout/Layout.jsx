import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Dashboard from "../Pages/Dashboard"
import { Routes, Route } from "react-router-dom";
import Contacts from "../Pages/Contact";
import Services from "../Pages/Services";
import Home from "../Pages/Home";
import HomeRouter from "../../routes/home.routes";
import PrivateRoute from "../../routes/PrivateRoutes";
import Error404 from "../Pages/Error404";


const Header = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomeRouter />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/Dashboard" element={
                        <PrivateRoute><Dashboard /></PrivateRoute>
                        } />
                    <Route path="/Services" element={<Services />} />
                    <Route path="/Contacts" element={<Contacts />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="*" element={<Error404 />} />
                </Route>
            </Routes>
        </>
    );
}
export default Header;