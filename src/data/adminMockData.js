// Admin data management with localStorage persistence

const STORAGE_KEYS = {
    CLIENTS: 'waas_clients',
    CREDENTIALS: 'waas_admin_credentials',
};

// Default clients data
const defaultClients = [
    {
        id: '1',
        name: 'Carlos Mendoza',
        company: 'Abogados Mendoza & Asociados',
        domain: 'abogadosmendoza.com',
        plan: 80000,
        status: 'active',
        nextPayment: '25/01/2025',
        phone: '3001234567',
        isActive: true,
        createdAt: '2024-06-15',
    },
    {
        id: '2',
        name: 'María González',
        company: 'Clínica Dental Sonrisa',
        domain: 'clinicasonrisa.com',
        plan: 80000,
        status: 'active',
        nextPayment: '28/01/2025',
        phone: '3109876543',
        isActive: true,
        createdAt: '2024-07-20',
    },
    {
        id: '3',
        name: 'Juan Pérez',
        company: 'Restaurante El Sabor',
        domain: 'restauranteelsabor.com',
        plan: 80000,
        status: 'pending',
        nextPayment: '15/01/2025',
        phone: '3201122334',
        isActive: true,
        createdAt: '2024-08-10',
    },
    {
        id: '4',
        name: 'Ana Rodríguez',
        company: 'Boutique Eleganza',
        domain: 'boutiqueeleganza.com',
        plan: 80000,
        status: 'suspended',
        nextPayment: '10/01/2025',
        phone: '3155544332',
        isActive: false,
        createdAt: '2024-05-05',
    },
    {
        id: '5',
        name: 'Luis Torres',
        company: 'Inmobiliaria Horizonte',
        domain: 'inmobiliariahorizonte.com',
        plan: 80000,
        status: 'active',
        nextPayment: '30/01/2025',
        phone: '3187766554',
        isActive: true,
        createdAt: '2024-09-01',
    },
];

// Default admin credentials
const defaultCredentials = {
    username: 'admin',
    password: 'AMC2025!',
};

// Initialize data if not exists
export const initializeData = () => {
    if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(defaultClients));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CREDENTIALS)) {
        localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(defaultCredentials));
    }
};

// Get all clients
export const getClients = () => {
    const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return data ? JSON.parse(data) : defaultClients;
};

// Add new client
export const addClient = (client) => {
    const clients = getClients();
    const newClient = {
        ...client,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
    };
    clients.push(newClient);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    return newClient;
};

// Update client
export const updateClient = (id, updates) => {
    const clients = getClients();
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        clients[index] = { ...clients[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
        return clients[index];
    }
    return null;
};

// Delete client
export const deleteClient = (id) => {
    const clients = getClients();
    const filtered = clients.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(filtered));
    return true;
};

// Get credentials
export const getCredentials = () => {
    const data = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    return data ? JSON.parse(data) : defaultCredentials;
};

// Update credentials
export const updateCredentials = (newCredentials) => {
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(newCredentials));
    return true;
};

// Calculate KPIs
export const calculateKPIs = () => {
    const clients = getClients();
    const activeClients = clients.filter(c => c.status === 'active').length;
    const overduePayments = clients.filter(c => c.status === 'pending').length;
    const mrr = clients.filter(c => c.status === 'active').reduce((sum, c) => sum + c.plan, 0);
    const retentionRate = clients.length > 0 ? ((activeClients / clients.length) * 100).toFixed(1) : 0;

    return {
        mrr,
        activeClients,
        overduePayments,
        retentionRate,
        totalClients: clients.length,
    };
};

// Get pending payments
export const getPendingPayments = () => {
    const clients = getClients();
    return clients.filter(c => c.status === 'pending');
};
