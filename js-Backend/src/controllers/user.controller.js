import {User} from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        // const newUser = new User({username, password, email});
        // await newUser.save();
        // res.status(201).json({message: 'User registered successfully', userId: newUser._id});

            // Simple validation
        if (!username || !password || !email) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // Check for existing user
        const existingUser = await User.findOne({$or: [{username}, {email}]});

        if (existingUser) {
            return res.status(409).json({message: 'Username or email already in use'});
        }

        // Create a user
        const user = await User.create({username, 
            password, 
            email: email.toLowerCase(),
            loggedIn: false,
        });
        res.status(201).json({
            message: 'User registered successfully',
             user: {id: user._id, username: user.username, email: user.email}   
        });

    } catch (error) {
        res.status(500).json({message: 'Error registering user', error: error.message});
    }
};

export {registerUser};