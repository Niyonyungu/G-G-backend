import Memory from "../models/memories.js";

// @desc    Get all memories
// @route   GET /api/memories
// @access  Public
const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({}).sort({ createdAt: -1 });
        res.json(memories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a new memory
// @route   POST /api/memories
// @access  Public
const createMemory = async (req, res) => {
    try {
        const { name, message, mediaUrl } = req.body;

        const memory = await Memory.create({
            name,
            message,
            mediaUrl: mediaUrl || '/placeholder.svg',
        });

        res.status(201).json(memory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a memory
// @route   DELETE /api/memories/:id
// @access  Private
const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);

        if (!memory) {
            res.status(404).json({ message: 'Memory not found' });
            return;
        }

        await memory.deleteOne();
        res.json({ message: 'Memory removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getMemories, createMemory, deleteMemory };