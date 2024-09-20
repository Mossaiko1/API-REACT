import { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../Context/AccountContext';
import Swal from 'sweetalert2';
import { Button, Form, ListGroup, Card, Alert } from 'react-bootstrap';
import { BiPlusCircle, BiDonateHeart, BiMinusCircle, BiKey, BiTrash, BiXCircle, BiListCheck } from 'react-icons/bi';

const Accounts = () => {
    const { accounts, createAccount, deposit, withdraw, updateAccountPassword, deleteAccount, error, setAccounts } = useContext(AccountContext);
    const [formData, setFormData] = useState({
        documentoCliente: '',
        fechaApertura: '',
        saldo: '',
        claveAcceso: '',
    });
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [actionType, setActionType] = useState('');
    const [showDetails, setShowDetails] = useState({});

    useEffect(() => {
        if (error) {
            Swal.fire('Error', error, 'error');
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAccount = await createAccount(formData);
            Swal.fire('Cuenta creada', 'La cuenta ha sido creada exitosamente', 'success');
            setAccounts((prev) => [...prev, newAccount]); // Actualizar el estado con la nueva cuenta
            setFormData({ documentoCliente: '', fechaApertura: '', saldo: '', claveAcceso: '' });
        } catch (err) {
            Swal.fire('Error', err.message, 'error'); // Mostrar el mensaje de error
        }
    };
    

    const handleDeposit = async (e) => {
        e.preventDefault();
        try {
            await deposit(selectedAccount, amount);
            setAccounts((prev) => prev.map(account =>
                account.numeroCuenta === selectedAccount ? { ...account, saldo: account.saldo + parseFloat(amount) } : account
            ));
            Swal.fire('Depósito realizado', 'El depósito fue exitoso', 'success');
        } catch (error) {
            console.error("Error al realizar el depósito:", error);
            Swal.fire('Error', 'No se pudo realizar el depósito', 'error');
        }
        resetForms();
    };
    

    const handleWithdraw = async (e) => {
        e.preventDefault();
        await withdraw(selectedAccount, amount);
        setAccounts((prev) => prev.map(account =>
            account.numeroCuenta === selectedAccount ? { ...account, saldo: account.saldo - parseFloat(amount) } : account
        ));
        Swal.fire('Retiro realizado', 'El retiro fue exitoso', 'success');
        resetForms();
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        await updateAccountPassword(selectedAccount, newPassword);
        Swal.fire('Clave actualizada', 'La clave ha sido cambiada exitosamente', 'success');
        resetForms();
    };

    const handleDelete = async (accountId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás recuperar esta cuenta!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            await deleteAccount(accountId);
            setAccounts(prev => prev.filter(account => account.numeroCuenta !== accountId));
            Swal.fire('Eliminado', 'La cuenta ha sido eliminada.', 'success');
        }
    };

    const toggleDetails = (numeroCuenta) => {
        setShowDetails(prev => ({
            ...prev,
            [numeroCuenta]: !prev[numeroCuenta]
        }));
    };

    const resetForms = () => {
        setSelectedAccount(null);
        setAmount('');
        setNewPassword('');
        setActionType('');
    };

    return (
        <div className="container mt-5 accounts-container">
            <h1 className="text-center mb-4" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Gestión de Cuentas</h1>
            <hr style={{ borderColor: 'blue', width: '100%', height: '2px' }} />
    
            {/* Mensaje de error si existe */}
            {error && <Alert variant="danger">{error}</Alert>}
    
            <Card className="mb-4 shadow-sm text-center">
                <Card.Body>
                    <h4><BiPlusCircle /> Crear Nueva Cuenta</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Documento del Cliente</Form.Label>
                            <Form.Control
                                type="text"
                                name="documentoCliente"
                                value={formData.documentoCliente}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Apertura</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechaApertura"
                                value={formData.fechaApertura}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Saldo Inicial</Form.Label>
                            <Form.Control
                                type="number"
                                name="saldo"
                                value={formData.saldo}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Clave de Acceso</Form.Label>
                            <Form.Control
                                type="password"
                                name="claveAcceso"
                                value={formData.claveAcceso}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="w-100"><BiPlusCircle /> Crear Cuenta</Button>
                    </Form>
                </Card.Body>
            </Card>
    
            <h4><BiListCheck /> Lista de Cuentas</h4>
            <ListGroup>
                {accounts.length > 0 ? (
                    accounts.map(account => (
                        <ListGroup.Item key={account.numeroCuenta} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>No. Cuenta:</strong> {account.numeroCuenta}<br />
                                <strong>Saldo:</strong> ${typeof account.saldo === 'number' ? account.saldo.toFixed(2) : 'N/A'}
                                {showDetails[account.numeroCuenta] && (
                                    <div>
                                        <strong>Documento Cliente:</strong> {account.documentoCliente}<br />
                                        <strong>Fecha Apertura:</strong> {account.fechaApertura}<br />
                                        <strong>Clave de Acceso:</strong> {account.claveAcceso}
                                    </div>
                                )}
                            </div>
                            <div className="btn-group">
                                <Button variant="primary" onClick={() => toggleDetails(account.numeroCuenta)}>
                                    {showDetails[account.numeroCuenta] ? 'Ocultar Detalles' : 'Ver Detalles'}
                                </Button>
                                <Button variant="success" onClick={() => { setSelectedAccount(account.numeroCuenta); setActionType('deposit'); }}>
                                    <BiDonateHeart /> Depositar
                                </Button>
                                <Button variant="warning" onClick={() => { setSelectedAccount(account.numeroCuenta); setActionType('withdraw'); }}>
                                    <BiMinusCircle /> Retirar
                                </Button>
                                <Button variant="info" onClick={() => { setSelectedAccount(account.numeroCuenta); setActionType('updatePassword'); }}>
                                    <BiKey /> Cambiar Clave
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(account.numeroCuenta)}>
                                    <BiTrash /> Eliminar
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No hay cuentas disponibles.</ListGroup.Item>
                )}
            </ListGroup>
    
            {/* Formularios para depósitos, retiros y cambio de clave */}
            {actionType === 'deposit' && (
                <Card className="mt-4 shadow-sm">
                    <Card.Body>
                        <h4><BiDonateHeart /> Depositar en Cuenta {selectedAccount}</h4>
                        <Form onSubmit={handleDeposit}>
                            <Form.Group className="mb-3">
                                <Form.Label><BiDonateHeart /> Monto a Depositar</Form.Label>
                                <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0" />
                            </Form.Group>
                            <Button type="submit" className="w-100"><BiDonateHeart /> Depositar</Button>
                            <Button type="button" className="w-100 mt-2" onClick={resetForms}><BiXCircle /> Cancelar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
    
            {actionType === 'withdraw' && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h4><BiMinusCircle /> Retirar de Cuenta {selectedAccount}</h4>
                        <Form onSubmit={handleWithdraw}>
                            <Form.Group className="mb-3">
                                <Form.Label><BiMinusCircle /> Monto a Retirar</Form.Label>
                                <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0" />
                            </Form.Group>
                            <Button type="submit" className="w-100"><BiMinusCircle /> Retirar</Button>
                            <Button type="button" className="w-100 mt-2" onClick={resetForms}><BiXCircle /> Cancelar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
    
            {actionType === 'updatePassword' && (
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h4><BiKey /> Cambiar Clave de Cuenta {selectedAccount}</h4>
                        <Form onSubmit={handleUpdatePassword}>
                            <Form.Group className="mb-3">
                                <Form.Label><BiKey /> Nueva Clave de Acceso</Form.Label>
                                <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                            </Form.Group>
                            <Button type="submit" className="w-100"><BiKey /> Cambiar Clave</Button>
                            <Button type="button" className="w-100 mt-2" onClick={resetForms}><BiXCircle /> Cancelar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
export default Accounts;
