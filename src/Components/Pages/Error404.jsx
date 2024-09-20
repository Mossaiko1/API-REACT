import '../../styles/error404.css';

const Error404 = () => {
    return (
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <p className="error-message">Página no encontrada</p>
            <a href="/" className="error-link">Regresar al inicio</a>
        </div>
    );
};

export default Error404;
