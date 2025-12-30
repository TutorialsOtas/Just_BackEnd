import {Post} from '../models/post.model.js';

//Create a post
const createPost = async (req, res) => {

    try {
        const {name, description, age} = req.body;

        if (!name || !description || !age) {

            return res.status(400).json({message: 'All fields are required'});
        }

        const newPost = new Post({name, description, age});
        await newPost.save();
        res.status(201).json({message: 'Post created successfully', postId: newPost._id});

    } catch (error) {
        res.status(500).json({message: 'Error creating post', error: error.message});
    }
};

//GET all posts
const getPosts = async (req, res) => {

    try {
        const posts = await Post.find();
        res.status(200).json({message: 'Posts retrieved successfully', posts: getPosts});
    } catch (error) {
        res.status(500).json({message: 'Error retrieving posts', error: error.message});
    }
};

//Update a post
const updatePost = async (req, res) => {
    
    try {

//basic validation for an empty body
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({message: 'Request body cannot be empty'});
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!post) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json({message: 'Post updated successfully', post});

        // const postId = req.params.id;
        // const {name, description, age} = req.body;

        // const post = await Post.findById(postId);
        // if (!post) {
        //     return res.status(404).json({message: 'Post not found'});
        // }

        // post.name = name || post.name;
        // post.description = description || post.description;
        // post.age = age || post.age;

        // await post.save();
        // res.status(200).json({message: 'Post updated successfully', post});

    } catch (error) {
        res.status(500).json({message: 'Error updating post', error: error.message});
    }   
};

//Delete a post
const deletePost = async (req, res) => {
    try {

        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({message: 'Post not found'});
        }

        res.status(200).json({message: 'Post deleted successfully'});


    } catch (error) {

        res.status(500).json({message: 'Error deleting post', error: error.message});

    }
};

export {createPost, getPosts,updatePost,deletePost};