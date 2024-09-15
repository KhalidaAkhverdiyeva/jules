const mongoose = require("mongoose");
const bloglist = require("../models/blogSchema");
const { ErrorHandler } = require("../utils/ErrorHandlers");



const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await bloglist.find();
        if (!blogs.length) {
            return next(new ErrorHandler("No blogs found", 404));
        }
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        next(error);
    }
};



const getBlogById = async (req, res, next) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return next(new ErrorHandler("Invalid Blog ID format", 400));
        }

        const blog = await bloglist.findById(blogId);

        if (!blog) {
            return next(new ErrorHandler("Blog not found", 404));
        }

        res.status(200).json({ success: true, blog });
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, description, author, createAt } = req.body;

        const uploadedFile = req.file;

        const newBlog = await bloglist.create({
            title,
            description,
            author,
            createAt,
            image: uploadedFile ? uploadedFile.path : null,
        });

        return res.status(201).json({
            success: true,
            newBlog,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const blog = await bloglist.findByIdAndDelete(blogId);

        if (!blog) {
            return next(new ErrorHandler("Blog not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { getAllBlogs, getBlogById, createBlog, deleteBlog }