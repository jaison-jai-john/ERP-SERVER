import Post from '../Models/Post.js';

// Add a new post
export const addPost = async (req, res) => {
  try {
    const newPost = {
      postType: req.body.postType,
      message: req.body.message,
      content: req.body.content,
      CID: req.body.CID,
      created: req.body.created ? req.body.created : Date.now(),
      due: req.body.due ? req.body.due : null,
    };
    let result = await Post.create(newPost);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message, dat: req.body });
  }
};

// Fetch a single post by ID
export const getPostById = async (req, res) => {
  try {
    const { PID } = req.params;
    const post = await Post.findOne({ PID });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all posts
export const getAllPosts = async (req, res) => {
  try {
    const classID = req.params.CID;
    const posts = await Post.find({ CID: classID });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by ID
export const updatePostById = async (req, res) => {
  try {
    const { PID } = req.params;
    const { postType, message, content, due } = req.body;
    const updatedPost = await Post.find({ PID }).updateMany({
      postType,
      message,
      content,
      due,
    });
    if (updatedPost.modifiedCount < 1) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json({ ...updatedPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a post by ID
export const deletePostById = async (req, res) => {
  try {
    const { PID } = req.params;
    const deletedPost = await Post.findOneAndDelete({ PID });
    return res.json({ ...deletedPost, message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
