import { createContext, useState, useEffect } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch('https://cuenta-qalg.onrender.com/api/clients');
            if (!response.ok) {
                throw new Error('Error fetching clients');
            }
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        }
    };

    const addClient = async (newClient) => {
        try {
            const response = await fetch('https://cuenta-qalg.onrender.com/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message); // Manejar el error con el mensaje del servidor
            }

            await fetchClients(); // Actualiza la lista después de agregar
        } catch (error) {
            console.error('Failed to add client:', error);
            throw error; // Lanza el error para que se pueda manejar en el componente
        }
    };

    const updateClient = async (clientId, updatedClient) => {
        try {
            const response = await fetch(`https://cuenta-qalg.onrender.com/api/clients/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedClient),
            });
            if (!response.ok) {
                throw new Error('Error updating client');
            }
            await fetchClients(); // Actualiza la lista después de actualizar
        } catch (error) {
            console.error('Failed to update client:', error);
        }
    };

    const deleteClient = async (clientId) => {
        try {
            const response = await fetch(`https://cuenta-qalg.onrender.com/api/clients/${clientId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting client');
            }
            await fetchClients(); // Actualiza la lista después de eliminar
        } catch (error) {
            console.error('Failed to delete client:', error);
        }
    };

    return (
        <ClientContext.Provider value={{ clients, fetchClients, addClient, updateClient, deleteClient }}>
            {children}
        </ClientContext.Provider>
    );
};
