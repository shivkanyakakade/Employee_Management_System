const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

// GET ALL EMPLOYEES

router.get('/', verifyToken, async (req, res) => {

    try {

        //testing for showing spinner before loading data...
        // await new Promise(resolve =>
        //     setTimeout(resolve, 2000)
        // );

        const employees =
            await Employee.find();

        res.status(200).json(
            employees
        );

    }

    catch (error) {

        console.log("BACKend Error: ", error);
        res.status(500).json({
            message: error.message
        });

    }

});


//ADD EMPLOYEE

router.post('/', verifyToken, isAdmin, async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            department,
            mobile,
            role
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // Create Employee
        const employee = new Employee({

            name,
            email,
            department,
            mobile,
            role

        });

        const savedEmployee = await employee.save();

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({

            username: name,
            email,
            password: hashedPassword,
            role

            // role: "employee"

        });

        await user.save();

        res.status(201).json({
            message: "Employee Created Successfully",
            employee: savedEmployee
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// GET EMPLOYEE BY ID

router.get('/:id', verifyToken, async (req, res) => {

    try {

        const employee =
            await Employee.findById(
                req.params.id
            );

        if (!employee) {

            return res.status(404).json({
                message: 'Employee Not Found'
            });

        }
        //response
        res.status(200).json(employee);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE EMPLOYEE

// router.put('/:id', verifyToken, isAdmin, async (req, res) => {
router.put('/:id', verifyToken, async (req, res) => {
    try {

        // employee -> can edit only his record...
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: 'Employee Not Found'
            });

        }

        //this condition skips for "ADMIN" and "Matching Email" and then allows EDIT option
        if (
            req.user.role !== 'admin' &&
            employee.email !== req.user.email
        ) {

            return res.status(403).json({
                message: 'You can edit only your own profile.'
            });

        }


        //previous code...
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (req.body.password) {

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const updatedUser = await User.findOneAndUpdate(

                {
                    email: employee.email
                },

                {
                    username: req.body.name,
                    email: req.body.email,
                    // password : hashedPassword

                }

            );
        }

        console.log("Employee Email:", employee.email);
        console.log("Request Email:", req.body.email);

        const updatedUser = await User.findOneAndUpdate(
            {
                email: employee.email
            },
            {
                username: req.body.name,
                email: req.body.email
            },
            {
                new: true
            }
        );

        console.log("Updated USer", updatedUser);

        if (!updatedUser) {
            console.log('No Matching user found to Update....')

            return res.status(404).json({
                message: "User not found"
            });
        }

        // if (!updatedEmployee) {

        //     return res.status(404).json({
        //         message: 'Employee Not Found'
        //     });

        // }

        //response
        res.status(200).json(
            updatedEmployee
        );

    }

    catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});

// DELETE EMPLOYEE

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {

    try {

        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({
                message: 'Employee Not Found'
            });
        }

        // const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        await User.findOneAndDelete({
            email: employee.email
        })

        //response...
        res.status(200).json({
            message:
                'Employee Deleted Successfully'
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;