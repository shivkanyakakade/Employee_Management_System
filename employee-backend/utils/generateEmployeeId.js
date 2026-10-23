const Counter = require('../models/Counter');

async function generateEmployeeId() {

    const counter = await Counter.findOneAndUpdate(

        { _id: 'employeeId' },
        { $inc: { sequence: 1 } },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }

    );

    return `EMP-${String(counter.sequence).padStart(4, '0')}`;
}

module.exports = generateEmployeeId;