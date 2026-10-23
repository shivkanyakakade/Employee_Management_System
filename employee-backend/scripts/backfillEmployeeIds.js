
require('dotenv').config();

const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Counter = require('../models/Counter');

async function backfillEmployeeIds() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        const existing = await Employee.find({
            employeeId: { $type: 'string' }
        })
            .select('_id employeeId')
            .lean();

        let highest = 0;
        const seen = new Set();

        // Check existing IDs before assigning new ones.
        for (const employee of existing) {
            const id = employee.employeeId.trim();

            if (!id) continue;

            if (seen.has(id)) {
                throw new Error(`Duplicate employeeId found: ${id}`);
            }
            seen.add(id);

            const match = /^EMP-(\d+)$/.exec(id);

            if (match) {
                highest = Math.max(highest, Number(match[1]));
            }
        }

        // Set the counter to at least the highest existing sequence.
        await Counter.updateOne(
            { _id: 'employeeId' },
            { $max: { sequence: highest } },
            { upsert: true }
        );

        // Find employees whose ID is missing or blank.
        const missing = await Employee.find({
            $or: [
                { employeeId: { $exists: false } },
                { employeeId: null },
                { employeeId: '' }
            ]
        })
            .select('_id')
            .sort({ _id: 1 })
            .lean();

        for (const employee of missing) {
            const counter = await Counter.findOneAndUpdate(
                { _id: 'employeeId' },
                { $inc: { sequence: 1 } },
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            );

            const employeeId =
                `EMP-${String(counter.sequence).padStart(4, '0')}`;

            await Employee.updateOne(
                { _id: employee._id },
                { $set: { employeeId } }
            );

            console.log(`Assigned ${employeeId} to ${employee._id}`);
        }

        console.log(`Migration completed: ${missing.length} employees updated.`);

    }

    catch (error) {
        console.error('Migration failed:', error);
        process.exitCode = 1;
    }

    finally {
        await mongoose.disconnect();
    }

}

backfillEmployeeIds();
