import { useContext, useState } from 'react';
import { ClientContext } from '../Context/clientContext';
import { FaEdit, FaTrashAlt, FaPlus, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../styles/client.css';

const Clients = () => {
    const { clients, addClient, updateClient, deleteClient } = useContext(ClientContext);

    const [newClient, setNewClient] = useState({ documentoCliente: '', nombreCompleto: '', celular: '', fechaNacimiento: '' });
    const [editClient, setEditClient] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleAddClient = async () => {
        const exists = clients.some(client => client.documentoCliente === newClient.documentoCliente);
        if (exists) {
            Swal.fire({
                icon: 'warning',
                title: 'Cliente Existente',
                text: 'El documento ya existe. Por favor, ingrese uno diferente.',
            });
            return;
        }

        try {
            await addClient(newClient);
            setNewClient({ documentoCliente: '', nombreCompleto: '', celular: '', fechaNacimiento: '' });
            Swal.fire({
                icon: 'success',
                title: 'Cliente Agregado',
                text: 'El cliente ha sido agregado con éxito.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al agregar el cliente: ' + error.message,
            });
        }
    };

    const handleUpdateClient = async () => {
        try {
            await updateClient(editClient._id, editFormData);
            setEditClient(null);
            Swal.fire({
                icon: 'success',
                title: 'Cliente Actualizado',
                text: 'El cliente ha sido actualizado con éxito.',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el cliente: ' + error.message,
            });
        }
    };

    const handleDeleteClient = (clientId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteClient(clientId);
                    Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar el cliente: ' + error.message,
                    });
                }
            }
        });
    };

    const handleViewDetails = (client) => {
        setSelectedClient(client);
    };

    const handleEditClient = (client) => {
        setEditClient(client);
        setEditFormData(client); // Set initial data for edit form
    };

    return (
        <div className="clients-container">
            <h1 className="text-center title">Clientes</h1>

            {/* Add Client Form */}
            <div className="form-card mb-4">
                <h2 className="form-card-title">Agregar Cliente</h2>
                <Form className="client-form">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Documento Cliente"
                            value={newClient.documentoCliente}
                            onChange={(e) => setNewClient({ ...newClient, documentoCliente: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nombre Completo"
                            value={newClient.nombreCompleto}
                            onChange={(e) => setNewClient({ ...newClient, nombreCompleto: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Celular"
                            value={newClient.celular}
                            onChange={(e) => setNewClient({ ...newClient, celular: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="date"
                            placeholder="Fecha de Nacimiento"
                            value={newClient.fechaNacimiento}
                            onChange={(e) => setNewClient({ ...newClient, fechaNacimiento: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Button className="btn-primary w-100" onClick={handleAddClient} disabled={!(newClient.documentoCliente && newClient.nombreCompleto && newClient.celular && newClient.fechaNacimiento)}>
                        <FaPlus className="me-2" />
                        Agregar Cliente
                    </Button>
                </Form>
            </div>

            {/* Clients List */}
            <div className="list-card mb-4">
                <h2 className="list-card-title">Lista de Clientes</h2>
                <ul className="list-group">
                    {clients.map(client => (
                        <li className="list-group-item" key={client._id}>
                            <div className="client-info">
                                <strong>{client.nombreCompleto}</strong> - {client.celular}
                            </div>
                            <div className="client-actions">
                                <div className="action-buttons">
                                    <Button variant="info" onClick={() => handleViewDetails(client)}>
                                        <FaInfoCircle />
                                    </Button>
                                    <Button variant="warning" onClick={() => handleEditClient(client)}>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteClient(client._id)}>
                                        <FaTrashAlt />
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal for Client Details */}
            <Modal show={!!selectedClient} onHide={() => setSelectedClient(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedClient && (
                        <>
                            <p><strong>Documento:</strong> {selectedClient.documentoCliente}</p>
                            <p><strong>Nombre:</strong> {selectedClient.nombreCompleto}</p>
                            <p><strong>Celular:</strong> {selectedClient.celular}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {selectedClient.fechaNacimiento}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedClient(null)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Editing Client */}
            <Modal show={!!editClient} onHide={() => setEditClient(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editClient && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Documento Cliente"
                                    value={editFormData.documentoCliente}
                                    onChange={(e) => setEditFormData({ ...editFormData, documentoCliente: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre Completo"
                                    value={editFormData.nombreCompleto}
                                    onChange={(e) => setEditFormData({ ...editFormData, nombreCompleto: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Celular"
                                    value={editFormData.celular}
                                    onChange={(e) => setEditFormData({ ...editFormData, celular: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="date"
                                    placeholder="Fecha de Nacimiento"
                                    value={editFormData.fechaNacimiento}
                                    onChange={(e) => setEditFormData({ ...editFormData, fechaNacimiento: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditClient(null)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleUpdateClient}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Clients;
