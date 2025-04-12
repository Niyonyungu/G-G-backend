import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import User from '../models/user.js';
import { sendWelcomeEmail } from '../utils/emailService.js';

const registerUser = async (req, res) => {
    try {
        let UserData = req.body;
        const plainPassword = UserData.password;
        // Check if the email exists in the request body
        if (!UserData.email) {
            return res.status(400).json({
                status: 400,
                message: "Email is required"
            });
        }
        const userPassword = await bcrypt.hash(UserData.password, 10);
        UserData = { ...UserData, password: userPassword };

        const userExists = await User.findOne({ email: UserData.email });

        if (userExists) {
            return res.status(400).json({
                status: 400,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create(UserData);
        // Send welcome email
        try {
            await sendWelcomeEmail(user, plainPassword);
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            // Continue with the registration process even if email fails
        }
        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            status: 500,
            message: "Error occurred during registration",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
            status: 200,
            message: "Logged in successfully",
            token,
            userData: user
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            status: 500,
            message: "Error occurred during login",
            error: error.message
        });
    }
};

export { loginUser, registerUser };