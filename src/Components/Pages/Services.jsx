import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/LoginContext';
import '../../styles/services.css';

const Services = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAccessClick = (e, target) => {
        e.preventDefault();
        if (isAuthenticated()) {
            navigate(target); // Redirige a la página según el destino
        } else {
            navigate('/Login'); // Redirige a la página de inicio de sesión
        }
    };

    return (
        <>
            <header className="services-header">
                <h1 className="services-title">Servicios de Registro</h1>
                <p className="services-subtitle">Gestiona fácilmente clientes y cuentas bancarias.</p>
            </header>

            <section className="services-cards-section">
                <div className="services-cards">
                    {[
                        {
                            img: "https://cdn-icons-png.flaticon.com/512/3534/3534139.png",
                            title: "Registro de Clientes",
                            text: "Agrega y gestiona la información de nuevos clientes de manera sencilla y segura.",
                            link: '/Clients' // Destino para este botón
                        },
                        {
                            img: "https://cdn-icons-png.flaticon.com/512/992/992834.png",
                            title: "Gestión de Cuentas",
                            text: "Crea, edita y administra las cuentas bancarias de los clientes registrados.",
                            link: '/Accounts' // Destino para este botón
                        },
                        {
                            img: "https://cdn-icons-png.flaticon.com/512/2878/2878547.png",
                            title: "Transacciones",
                            text: "Gestiona depósitos y retiros desde las cuentas bancarias de los clientes.",
                            link: '/Accounts' // Ahora también lleva a cuentas
                        }
                    ].map((service, index) => (
                        <div className="card service-card" key={index}>
                            <img
                                src={service.img}
                                alt={service.title}
                                className="card-img-top"
                                style={{ width: '200px', height: '180px', margin: '0 auto', display: 'block' }}
                            />
                            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                                <h3 className="card-title">{service.title}</h3>
                                <p className="card-text">{service.text}</p>
                                {service.link && (
                                    <button
                                        className="btn btn-outline-primary"
                                        style={{ marginTop: 'auto', display: 'block', margin: '0 auto', width: '150px', textAlign: 'center' }} // El marginTop: 'auto' empuja el botón hacia abajo
                                        onClick={(e) => handleAccessClick(e, service.link)}
                                    >
                                        Acceder
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Banco. Todos los derechos reservados.</p>
            </footer>
        </>
    );
};

export default Services;
