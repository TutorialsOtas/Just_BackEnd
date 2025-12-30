import mongoose,{ Schema } from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            // minlength: 3,
            // maxlength: 100
        },
        description: {
            type: String,
            required: true,
            trim: true,
            // minlength: 10,
            // maxlength: 1000
        },

        age: {
            type: Number,
            required: true,
            min: 1,
            max: 120
        },
    
},
    { 
        timestamps: true 
    }

);

export const Post = mongoose.model('Post', postSchema);   