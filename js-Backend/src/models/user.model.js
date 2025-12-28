import mongoose,{ Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    },  

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },

    }

, { timestamps: true }

);
export const User = mongoose.model('User', userSchema);