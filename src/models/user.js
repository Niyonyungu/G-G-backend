import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        names: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: false
        },
        role: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('Users', userSchema);

export default User;