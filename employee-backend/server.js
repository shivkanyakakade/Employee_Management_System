require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
connectDB();

app.use(cors());
// app.use(cors({
//     origin:
//     'http://localhost:4200'
// }));



app.use('/api/auth', authRoutes);

app.use('/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.send('Employee Backend Running...');
});

// app.listen(process.env.PORT, () => {
//     console.log(
//         `Server running on port ${process.env.PORT}`
//     );
// });

app.listen(5000, () => {
    console.log(
        'Server running on port 5000'
    );
});