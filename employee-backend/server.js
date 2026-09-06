require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB();

// app.use(cors());
const corsOptions = {
    origin: [
        'http://localhost:4200',
        'https://employee-management-eta-teal.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));


app.use('/api/auth', authRoutes);

app.use('/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.send('Employee Backend Running...');
});

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});

// app.listen(5000, () => {
//     console.log(
//         'Server running on port 5000'
//     );
// });