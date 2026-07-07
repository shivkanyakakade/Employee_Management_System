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

        //here used %40 ASCII value of @ in password Employee@1234
        await mongoose.connect(
            // process.env.MONGO_URI

            'mongodb+srv://shivadmin:Employee%401234@cluster0.i1x6r1g.mongodb.net/employeedb?retryWrites=true&w=majority&appName=Cluster0'
        );

        console.log(
            'MongoDB Connected Successfully'
        );

    } catch (error) {

        console.error(
            'MongoDB Connection Error:',
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDB;