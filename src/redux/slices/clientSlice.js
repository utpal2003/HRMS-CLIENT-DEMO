


import { createSlice } from '@reduxjs/toolkit';


const clients = [
    {
        id: 'CL001',
        clientName: 'Alice Smith',
        companyName: 'Acme Corp',
        customerType: 'Individual',
        logoUrl: 'https://ui-avatars.com/api/?name=Acme+Corp&background=random',
        email: 'contact@acmecorp.com',
        phone: '9876543210',
        altPhone: '9876500000',
        contactPersons: [
            { name: 'John Doe', phone: '9876543210' },
            { name: 'Jane Roe', phone: '9876500001' }
        ],
        address: {
            country: 'India',
            state: 'Delhi',
            city: 'New Delhi',
            fullAddress: '123 Anvil Road, Industrial Area',
            zip: '110001'
        },
        shippingAddress: {
            headline: 'Warehouse #5',
            country: 'India',
            state: 'Delhi',
            city: 'New Delhi',
            fullAddress: '456 Export Lane, Industrial Area',
            zip: '110002'
        },
        billing: {
            totalBilled: 50000,
            totalReceived: 30000,
            totalDue: 20000
        },
        orders: [
            { projectName: 'Network Security Audit', orderId: 'ORD001', date: '2024-10-01 09:15', amount: 15000 },

            { projectName: 'Cloud Infrastructure Setup', orderId: 'ORD002', date: '2024-10-15 14:45', amount: 35000 }
        ],
        transactions: [
            { txnId: 'TX001', date: '2024-10-02', amount: 15000, type: 'Credit' },
            { txnId: 'TX002', date: '2024-10-20', amount: 15000, type: 'Credit' }
        ]
    },
    {
        id: 'CL002',
        clientName: 'Bob Johnson',
        companyName: 'Beta Solutions',
        customerType: 'Business',
        logoUrl: 'https://ui-avatars.com/api/?name=Beta+Solutions&background=random',
        email: 'info@betasolutions.in',
        phone: '9123456789',
        altPhone: '9123400000',
        contactPersons: [
            { name: 'Sarah Lee', phone: '9123456789' },
            { name: 'Mike Ross', phone: '9123400002' }
        ],
        address: {
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            fullAddress: '789 Tech Park, Cyber City',
            zip: '400001'
        },
        shippingAddress: {
            headline: 'Main Office',
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            fullAddress: '101 Data Drive, Innovation Hub',
            zip: '400002'
        },
        billing: {
            totalBilled: 120000,
            totalReceived: 100000,
            totalDue: 20000
        },
        orders: [
            { projectName: 'HR Management App', orderId: 'ORD003', date: '2024-09-05 11:00', amount: 50000 },
            { projectName: 'E-Commerce Website', orderId: 'ORD004', date: '2024-11-01 16:30', amount: 70000 }
        ],
        transactions: [
            { txnId: 'TX003', date: '2024-09-06', amount: 50000, type: 'Credit' },
            { txnId: 'TX004', date: '2024-11-05', amount: 50000, type: 'Credit' }
        ]
    },
    {
        id: 'CL003',
        clientName: 'Catherine Davis',
        companyName: 'Gamma Innovations',
        customerType: 'Individual',
        logoUrl: 'https://ui-avatars.com/api/?name=Gamma+Innovations&background=random',
        email: 'support@gammainnovations.com',
        phone: '9988776655',
        altPhone: '9988700000',
        contactPersons: [
            { name: 'David Kim', phone: '9988776655' }
        ],
        address: {
            country: 'India',
            state: 'Karnataka',
            city: 'Bengaluru',
            fullAddress: '321 Gardenia Road, Tech City',
            zip: '560001'
        },
        shippingAddress: {
            headline: 'Home Delivery',
            country: 'India',
            state: 'Karnataka',
            city: 'Bengaluru',
            fullAddress: '321 Gardenia Road, Tech City',
            zip: '560001'
        },
        billing: {
            totalBilled: 30000,
            totalReceived: 30000,
            totalDue: 0
        },
        orders: [
            { projectName: 'Inventory System', orderId: 'ORD005', date: '2024-08-10 13:20', amount: 30000 }
        ],
        transactions: [
            { txnId: 'TX005', date: '2024-08-12', amount: 30000, type: 'Credit' }
        ]
    },
    {
        id: 'CL004',
        clientName: 'David Wilson',
        companyName: 'Delta Solutions',
        customerType: 'Business',
        logoUrl: 'https://ui-avatars.com/api/?name=Delta+Solutions&background=random',
        email: 'sales@deltasolutions.co.in',
        phone: '9000112233',
        altPhone: '9000100000',
        contactPersons: [
            { name: 'Emily White', phone: '9000112233' },
            { name: 'Frank Black', phone: '9000100003' }
        ],
        address: {
            country: 'India',
            state: 'Tamil Nadu',
            city: 'Chennai',
            fullAddress: '654 Port Street, Industrial Estate',
            zip: '600001'
        },
        shippingAddress: {
            headline: 'Factory Unit',
            country: 'India',
            state: 'Tamil Nadu',
            city: 'Chennai',
            fullAddress: '987 Dock Road, Export Zone',
            zip: '600002'
        },
        billing: {
            totalBilled: 80000,
            totalReceived: 60000,
            totalDue: 20000
        },
        orders: [
            { projectName: 'Banking Portal', orderId: 'ORD006', date: '2024-07-20', amount: 40000 },
            { projectName: 'CRM System', orderId: 'ORD007', date: '2024-09-01', amount: 40000 }
        ],
        transactions: [
            { txnId: 'TX006', date: '2024-07-21', amount: 40000, type: 'Credit' },
            { txnId: 'TX007', date: '2024-09-05', amount: 20000, type: 'Credit' }
        ]
    },
    {
        id: 'CL005',
        clientName: 'Eve Brown',
        companyName: 'Epsilon Enterprises',
        customerType: 'Individual',
        logoUrl: 'https://ui-avatars.com/api/?name=Epsilon+Enterprises&background=random',
        email: 'contact@epsilon.in',
        phone: '9765432109',
        altPhone: '9765400000',
        contactPersons: [
            { name: 'Grace Green', phone: '9765432109' }
        ],
        address: {
            country: 'India',
            state: 'Uttar Pradesh',
            city: 'Lucknow',
            fullAddress: '111 Palace Road, Old City',
            zip: '226001'
        },
        shippingAddress: {
            headline: 'Residential',
            country: 'India',
            state: 'Uttar Pradesh',
            city: 'Lucknow',
            fullAddress: '111 Palace Road, Old City',
            zip: '226001'
        },
        billing: {
            totalBilled: 15000,
            totalReceived: 15000,
            totalDue: 0
        },
        orders: [
            { projectName: 'Mobile Banking App', orderId: 'ORD008', date: '2024-11-15', amount: 15000 }
        ],
        transactions: [
            { txnId: 'TX008', date: '2024-11-16', amount: 15000, type: 'Credit' }
        ]
    },
    {
        id: 'CL006',
        clientName: 'Frank Miller',
        companyName: 'Zeta Corp',
        customerType: 'Business',
        logoUrl: 'https://ui-avatars.com/api/?name=Zeta+Corp&background=random',
        email: 'info@zetacorp.com',
        phone: '9654321098',
        altPhone: '9654300000',
        contactPersons: [
            { name: 'Harry King', phone: '9654321098' },
            { name: 'Ivy Queen', phone: '9654300004' }
        ],
        address: {
            country: 'India',
            state: 'Gujarat',
            city: 'Ahmedabad',
            fullAddress: '222 Textile Road, Business Park',
            zip: '380001'
        },
        shippingAddress: {
            headline: 'Branch Office',
            country: 'India',
            state: 'Gujarat',
            city: 'Ahmedabad',
            fullAddress: '333 Commerce Street, Trading Hub',
            zip: '380002'
        },
        billing: {
            totalBilled: 95000,
            totalReceived: 95000,
            totalDue: 0
        },
        orders: [
            { projectName: 'Vendor Management System', orderId: 'ORD009', date: '2024-06-01', amount: 25000 },
            { projectName: 'HR Management App', orderId: 'ORD010', date: '2024-08-20', amount: 70000 }
        ],
        transactions: [
            { txnId: 'TX009', date: '2024-06-02', amount: 25000, type: 'Credit' },
            { txnId: 'TX010', date: '2024-08-22', amount: 70000, type: 'Credit' }
        ]
    },
    {
        id: 'CL007',
        clientName: 'Grace Taylor',
        companyName: 'Eta Solutions',
        customerType: 'Individual',
        logoUrl: 'https://ui-avatars.com/api/?name=Eta+Solutions&background=random',
        email: 'support@etasolutions.in',
        phone: '9543210987',
        altPhone: '9543200000',
        contactPersons: [
            { name: 'Jack White', phone: '9543210987' }
        ],
        address: {
            country: 'India',
            state: 'West Bengal',
            city: 'Kolkata',
            fullAddress: '444 Metro Lane, City Center',
            zip: '700001'
        },
        shippingAddress: {
            headline: 'Apartment',
            country: 'India',
            state: 'West Bengal',
            city: 'Kolkata',
            fullAddress: '444 Metro Lane, City Center',
            zip: '700001'
        },
        billing: {
            totalBilled: 45000,
            totalReceived: 35000,
            totalDue: 10000
        },
        orders: [
            { projectName: 'Inventory System', orderId: 'ORD011', date: '2024-05-10', amount: 20000 },
            { projectName: 'Banking Portal', orderId: 'ORD012', date: '2024-07-01', amount: 25000 }
        ],
        transactions: [
            { txnId: 'TX011', date: '2024-05-12', amount: 20000, type: 'Credit' },
            { txnId: 'TX012', date: '2024-07-05', amount: 15000, type: 'Credit' }
        ]
    },


];


const initialState = {
    clients,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        addClient: (state, action) => {
            state.clients.push(action.payload);
        },
        updateClient: (state, action) => {
            const index = state.clients.findIndex((client) => client.id === action.payload.id);
            if (index !== -1) {
                state.clients[index] = { ...state.clients[index], ...action.payload };
            }
        },
        deleteClient: (state, action) => {
            state.clients = state.clients.filter((client) => client.id !== action.payload);
        },
        setClientStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { addClient, updateClient, deleteClient, setClientStatus } = clientSlice.actions;

export default clientSlice.reducer;

//  Selectors
export const selectAllClients = (state) => state.clients.clients;
export const selectClientById = (state, clientId) =>
    state.clients.clients.find(client => client.id === clientId);
export const selectClientStatus = (state) => state.clients.status;