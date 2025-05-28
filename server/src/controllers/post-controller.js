const Post = require("../models/post-model");

exports.createPost = async (req, res) => {
    try {
        const { name, content, tech, link, isOpen, images } = req.body;
        const newPost = await Post.create({
            user: req.user.id,
            name,
            content,
            tech,
            link,
            isOpen,
            images,
        });

        res.status(201).json({ message: "Post saved successfully", post: newPost });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username email")
            .sort({ createdAt: -1 });
        res.status(200).json({ message: "All Posts fetched successfully", posts: posts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

exports.getMyPosts = async (req, res) => {
    try {
        console.log("req.user", req.user);
        const myPosts = await Post.find({ user: req.user.id }).sort({
            createdAt: -1,
        });
        res.status(200).json({ message: "My posts fetched successfully", posts: myPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete({ _id: req.params.id });
        if (!post) return res.status(404).json("Post not found");

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json("Not authorized to delete this post");
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
}