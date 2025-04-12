import mongoose from 'mongoose';

const memorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        mediaUrl: {
            type: String,
            default: '/placeholder.svg',
        },
    },
    {
        timestamps: true,
    }
);

const Memory = mongoose.model('Memories', memorySchema);

export default Memory;