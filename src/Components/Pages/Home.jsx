import { Link } from 'react-router-dom';
import '../../styles/home.css'

const Home = () => {
    return (
        <>
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Bienvenido a nuestro banco</h1>
                    <p className="hero-subtitle">Su socio de confianza en el crecimiento financiero</p>
                    <Link to="/Services" className="btn hero-btn">Explora nuestros servicios</Link>
                </div>
            </header>

            <section className="services-section">
                <h2 className="section-title">Nuestros servicios</h2>
                <div className="services-cards">
                    <div className="card service-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/2695/2695971.png" alt="Service 1" className="card-img-top" />
                        <div className="card-body">
                            <h3 className="card-title">Tarjeta Personal</h3>
                            <p className="card-text">Gestiona tus finanzas personales con facilidad y seguridad.</p>
                            <Link to="/Services" className="btn btn-outline-primary">Aquí</Link>
                        </div>
                    </div>
                    <div className="card service-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1289/1289362.png" alt="Service 2" className="card-img-top" />
                        <div className="card-body">
                            <h3 className="card-title">Soluciones financieras</h3>
                            <p className="card-text">Ayudamos a las personas a prosperar con nuestras soluciones personalizadas.</p>
                            <Link to="/Services" className="btn btn-outline-primary">Aquí</Link>
                        </div>
                    </div>
                    <div className="card service-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/3310/3310653.png" alt="Service 3" className="card-img-top" />
                        <div className="card-body">
                            <h3 className="card-title">Ahorro</h3>
                            <p className="card-text">Cuida de forma responsable tu patrimonio con nuestro banco.</p>
                            <Link to="/Services" className="btn btn-outline-primary">Aquí</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Banco. Todos los derechos reservados.</p>
            </footer>
        </>
    );
};

export default Home;
