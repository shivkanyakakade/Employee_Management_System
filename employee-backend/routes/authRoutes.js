const express = require('express');

const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');



//REGISTER API
// router.post('/register', async (req, res) => {

//     try {

//         const {
//             username,
//             email,
//             password,
//             role
//         } = req.body;

//         const existingUser =
//             await User.findOne({ email });

//         if (existingUser) {

//             return res.status(400).json({
//                 message:
//                     'User already exists'
//             });

//         }

//         const hashedPassword =
//             await bcrypt.hash(
//                 password,
//                 10
//             );

//         const user =
//             new User({

//                 username,

//                 email,

//                 password:
//                     hashedPassword,
//                 role

//             });

//         await user.save();

//         //response...
//         res.status(201).json({
//             message:
//                 'User Registered Successfully'
//         });

//     }

//     catch (error) {

//         res.status(500).json({
//             message:
//                 error.message
//         });

//     }

// });



//Reset PAssword API

router.post('/reset-password', verifyToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Find logged-in user
        const user = await User.findOne({
            email: req.user.email
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // Compare current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            console.log("current password is incorrect...");
            return res.status(400).json({
                message: "Current password is incorrect"
            });

        }

        // Hash new password
        user.password = await bcrypt.hash(
            newPassword,
            10
        );

        // Update password
        // user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
})



//LOGIN API
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        // console.log(req.body);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message:
                    'Invalid Email or Password'
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );
        if (!isMatch) {

            return res.status(400).json({
                message:
                    'Invalid Email or Password'
            });

        }

        const token =
            jwt.sign(

                {
                    userId: user._id,
                    email: user.email,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: '2h'
                }

            );

        res.status(200).json({

            // message:
            //     'Login Successful',

            token,
            user: {
                name: user.username,
                email: user.email,
                role: user.role
            }

        });

    }
    catch (error) {
        res.status(500).json({

            message:
                error.message

        });
    }
})

module.exports = router;