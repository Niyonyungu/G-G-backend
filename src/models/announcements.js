import mongoose from 'mongoose';

const announcementSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const Announcements = mongoose.model('Announcements', announcementSchema);

export default Announcements;