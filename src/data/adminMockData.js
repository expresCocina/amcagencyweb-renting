// Mock data for admin dashboard
export const clientsData = [
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
    },
];

// Calculate KPIs
export const calculateKPIs = () => {
    const activeClients = clientsData.filter(c => c.status === 'active').length;
    const overduePayments = clientsData.filter(c => c.status === 'pending').length;
    const mrr = clientsData.filter(c => c.status === 'active').reduce((sum, c) => sum + c.plan, 0);
    const retentionRate = ((activeClients / clientsData.length) * 100).toFixed(1);

    return {
        mrr,
        activeClients,
        overduePayments,
        retentionRate,
    };
};
