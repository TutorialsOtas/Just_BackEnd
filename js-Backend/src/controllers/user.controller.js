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

const loginUser = async (req, res) => {
    try {

        //checking if user exists
        const{email, password} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {return res.status(404).json({message: 'User not found'});}

        //validating password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Successful login
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id, 
                username: user.username, 
                email: user.email,
                password: user.password
            }
        });

    } catch (error) {

        res.status(500).json({message: 'Error logging in', error: error.message});

    }
};

const logoutUser = async (req, res) => {
    try {
        // Implement logout logic if needed (e.g., token invalidation)
        const {email} = req.body;
        const user = await User.findOne({ email});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // For demonstration, we'll just send a success message
        res.status(200).json({ message: 'Logout successful' });   
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};  

export {registerUser, loginUser , logoutUser};