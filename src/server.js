import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import rsvpRoutes from './routes/rsvpRoutes.js';
import memoryRoutes from './routes/memory.js';
import announcementRoutes from './routes/anouncement.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rsvps', rsvpRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/announcement', announcementRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Wedding Website API is running...');
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint not found. Please check the URL very well!',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});