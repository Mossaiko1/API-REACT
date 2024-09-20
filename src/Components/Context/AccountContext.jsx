import { createContext, useState, useEffect } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_URL = 'https://cuenta-qalg.onrender.com/api/accounts';

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Error fetching accounts');
            }
            const data = await response.json();
            setAccounts(Array.isArray(data.accounts) ? data.accounts : []);
        } catch (error) {
            console.error('Error en fetchAccounts:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createAccount = async (accountData) => {
        try {
            const response = await fetch(`https://cuenta-qalg.onrender.com/api/accounts/${accountData.documentoCliente}`);
            
            if (response.status === 404) {
                // Si no existe, continuar con la creación
            } else if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error checking account: ${errorText}`);
            } else {
                const exists = await response.json();
                if (exists) {
                    throw new Error('Account with this documentoCliente already exists.');
                }
            }
    
            // Create the account
            const res = await fetch('https://cuenta-qalg.onrender.com/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountData),
            });
    
            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(`Failed to create account: ${errorData}`);
            }
    
            const newAccount = await res.json();
            
            // Fetch the created account details
            const accountDetailsResponse = await fetch(`https://cuenta-qalg.onrender.com/api/accounts/${newAccount.documentoCliente}`);
            if (!accountDetailsResponse.ok) {
                throw new Error('Failed to fetch account details.');
            }
    
            const accountDetails = await accountDetailsResponse.json();
            return accountDetails; 
        } catch (error) {
            console.error('Error in createAccount:', error);
            throw error; 
        }
    };
    
    
    
    

    const updateAccount = (updatedAccount) => {
        setAccounts(prevAccounts => 
            prevAccounts.map(acc => acc.numeroCuenta === updatedAccount.numeroCuenta ? updatedAccount : acc)
        );
    };

    const deposit = async (numeroCuenta, monto) => {
        if (isNaN(monto) || monto <= 0) {
            setError('El monto debe ser un número mayor que cero.');
            return;
        }
    
        const accountToUpdate = accounts.find(acc => acc.numeroCuenta === numeroCuenta);
        if (!accountToUpdate) {
            setError('Cuenta no encontrada.');
            return;
        }
    
        // Actualiza el estado de manera optimista primero
        setAccounts(prevAccounts => {
            const updatedAccounts = prevAccounts.map(acc => acc.numeroCuenta === numeroCuenta 
                ? { ...acc, saldo: acc.saldo + monto } 
                : acc
            );
            return updatedAccounts;
        });
    
        try {
            const response = await fetch(`${API_URL}/accounts/${numeroCuenta}/deposit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numeroCuenta: parseInt(numeroCuenta), monto: parseFloat(monto) }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al realizar el depósito');
            }
    
            const updatedAccount = await response.json();
            updateAccount(updatedAccount.account);
        } catch (error) {
            console.error('Error en deposit:', error.message);
            setError(error.message);
            // Revertir el cambio optimista en caso de error
            setAccounts(prevAccounts => 
                prevAccounts.map(acc => acc.numeroCuenta === numeroCuenta 
                    ? { ...acc, saldo: acc.saldo - monto } 
                    : acc
                )
            );
        }
    };
    

    const withdraw = async (numeroCuenta, monto) => {
        if (monto <= 0) {
            setError('El monto debe ser mayor que cero.');
            return;
        }

        const accountToUpdate = accounts.find(acc => acc.numeroCuenta === numeroCuenta);
        if (!accountToUpdate || accountToUpdate.saldo < monto) {
            setError('Fondos insuficientes o cuenta no encontrada.');
            return;
        }

        // Actualización optimista del saldo
        setAccounts(prevAccounts => 
            prevAccounts.map(acc => acc.numeroCuenta === numeroCuenta 
                ? { ...acc, saldo: acc.saldo - monto } 
                : acc
            )
        );

        try {
            const response = await fetch(`${API_URL}/withdraw`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numeroCuenta: parseInt(numeroCuenta), monto: parseFloat(monto) }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al retirar dinero');
            }

            const updatedAccount = await response.json();
            updateAccount(updatedAccount.account);
        } catch (error) {
            console.error('Error en withdraw:', error.message);
            setError(error.message);
            // Revertir el cambio optimista en caso de error
            setAccounts(prevAccounts => 
                prevAccounts.map(acc => acc.numeroCuenta === numeroCuenta 
                    ? { ...acc, saldo: acc.saldo + monto } 
                    : acc
                )
            );
        }
    };

    const updateAccountPassword = async (numeroCuenta, newPassword) => {
        try {
            const response = await fetch(`${API_URL}/update-password/${numeroCuenta}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error updating password');
            }

            const updatedAccount = await response.json();
            setAccounts(prevAccounts => 
                prevAccounts.map(acc => acc.numeroCuenta === updatedAccount.account.numeroCuenta ? updatedAccount.account : acc)
            );
        } catch (error) {
            console.error('Error en updateAccountPassword:', error.message);
            setError(error.message);
        }
    };

    const deleteAccount = async (numeroCuenta) => {
        try {
            const response = await fetch(`${API_URL}/${numeroCuenta}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error deleting account');
            }
            setAccounts(prevAccounts => prevAccounts.filter(acc => acc.numeroCuenta !== parseInt(numeroCuenta)));
        } catch (error) {
            console.error('Error en deleteAccount:', error.message);
            setError(error.message);
        }
    };

    return (
        <AccountContext.Provider value={{ 
            accounts, 
            error, 
            loading, 
            createAccount, 
            deposit, 
            withdraw, 
            updateAccountPassword, 
            deleteAccount,
            setAccounts,
        }}>
            {children}
        </AccountContext.Provider>
    );
};
