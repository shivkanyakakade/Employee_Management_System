const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected Event');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose Error:', err);
});

const connectDB = async () => {
    // console.log('Inside ConnectDB')

    try {

        // console.log('Before MONGO connect');
        // console.log(process.env.MONGO_URI);

        await mongoose.connect(
            process.env.MONGO_URI

        );

        console.log('MongoDB Connected Successfully');

    } catch (error) {

        console.error(
            'MongoDB Connection Error:',
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDB;