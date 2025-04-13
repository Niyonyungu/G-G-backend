import Memory from "../models/memories.js";
import { cloudinary } from "../config/cloudinaryConfig.js";


const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            status: 200,
            message: 'Memories fetched successfully',
            data: memories
        });
    } catch (error) {
        console.error('Error fetching memories:', error);
        return res.status(500).json({
            status: 500,
            message: 'Server error while fetching memories',
            data: null
        });
    }
};

const getMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }
        return res.status(200).json({
            status: 200,
            message: 'Memory fetched successfully',
            data: memory
        });
    } catch (error) {
        console.error('Error fetching memory:', error);
        return res.status(500).json({
            status: 500,
            message: 'Server error while fetching memory',
            data: null
        });
    }
};

const createMemory = async (req, res) => {
    try {
        const { name, message, mediaUrl } = req.body;

        if (!name || !message) {
            return res.status(400).json({ message: 'Name and message are required' });
        }

        // Check if we have a file upload or a mediaUrl in the request body
        let finalMediaUrl;
        let mediaType;

        if (req.file) {
            // If a file was uploaded, use the path from multer/cloudinary
            finalMediaUrl = req.file.path;
            mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
        } else if (mediaUrl) {
            // If mediaUrl was provided in the request body
            finalMediaUrl = mediaUrl;
            // Determine media type based on URL extension
            mediaType = mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? 'image' : 'video';
        } else {
            return res.status(400).json({ message: 'Either a media file or mediaUrl is required' });
        }

        // Format the date
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const memory = await Memory.create({
            name,
            message,
            mediaUrl: finalMediaUrl,
            mediaType,
            date: currentDate
        });

        return res.status(201).json({
            status: 201,
            message: 'Memory created successfully',
            data: memory
        });

    } catch (error) {
        console.error('Error creating memory:', error);
        res.status(500).json({ message: 'Server error while creating memory' });
    }
};

const updateMemory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message } = req.body;

        const memory = await Memory.findById(id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Update fields if they are provided
        if (name) memory.name = name;
        if (message) memory.message = message;

        // If a new media file is uploaded, update it
        if (req.file) {
            // Extract public_id from Cloudinary URL to delete old media
            const urlParts = memory.mediaUrl.split('/');
            const publicIdWithExtension = urlParts[urlParts.length - 1];
            const publicId = `Gad-Gomez/${publicIdWithExtension.split('.')[0]}`;

            // Delete old file from Cloudinary
            await cloudinary.uploader.destroy(publicId, { resource_type: memory.mediaType });

            // Update with new media
            memory.mediaUrl = req.file.path;
            memory.mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
        }

        await memory.save();
        return res.status(200).json({
            status: 200,
            message: 'Memory updated successfully',
            data: memory
        });
    } catch (error) {
        console.error('Error updating memory:', error);
        return res.status(500).json({
            status: 500,
            message: 'Server error while updating memory',
            data: null
        });
    }
};

const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({ message: 'Memory not found' });
        }

        // Extract public_id from Cloudinary URL
        const urlParts = memory.mediaUrl.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = `Gad-Gomez/${publicIdWithExtension.split('.')[0]}`;

        // Delete file from Cloudinary
        await cloudinary.uploader.destroy(publicId, { resource_type: memory.mediaType });

        // Delete memory from database
        await Memory.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            status: 200,
            message: 'Memory deleted successfully',
            data: null
        });
    } catch (error) {
        console.error('Error deleting memory:', error);
        return res.status(500).json({
            status: 500,
            message: 'Server error while deleting memory',
            data: null
        });
    }
};

export { getMemories, getMemory, createMemory, updateMemory , deleteMemory };