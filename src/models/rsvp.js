import mongoose from 'mongoose';

const rsvpSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        event: {
            type: String,
            required: true,
        },
        numberOfGuests: {
            type: Number,
            required: true,
            default: 1,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const RSVP = mongoose.model('RSVPs', rsvpSchema);

export default RSVP;