// Import necessary modules
const express = require('express');
const { body, validationResult } = require('express-validator');

// Initialize Express app
const app = express();
app.use(express.json());

// Middleware to validate username, email, and password
const validateUser = [
    // Validate username (non-empty and alphanumeric)
    body('username')
        .isLength({ min: 1 }).withMessage('Username is required')
        .isAlphanumeric().withMessage('Username must be alphanumeric'),

    // Validate email (using built-in email validator)
    body('email')
        .isEmail().withMessage('Invalid email address'),

    // Validate password (at least 8 characters, with one letter, one number, and one special character)
    body('password')
        .isLength({ min: 1 }).withMessage('password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one capital letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character'),

    // Middleware function to check validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array(), message: errors.array()[0].msg });
        }
        next();
    }
];

// User creation route
app.post('/create-user', validateUser, (req, res) => {
    const { username, email, password } = req.body;
    // User creation logic here
    res.status(201).json({ message: 'User created successfully', user: { username, email } });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
