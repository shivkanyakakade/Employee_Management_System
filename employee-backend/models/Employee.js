const mongoose = require('mongoose');

const employeeschema = new mongoose.Schema({

    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        immutable: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    }
},

    {
        timestamps: true
    }
);



module.exports = mongoose.model('Employee', employeeschema);