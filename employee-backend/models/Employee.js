const mongoose = require('mongoose');

const employeeschema = new mongoose.Schema({

    // userId: {
    //     type: mongoose.Schema.Types.ObjectId(),
    //     ref: 'User',
    //     required: true
    // },

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
    });



module.exports = mongoose.model('Employee', employeeschema);