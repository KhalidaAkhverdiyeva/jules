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
        const blogs = await bloglist.findById();
        if (!blogs.length) {
            return next(new ErrorHandler("No blogs found", 404));
        }
        res.status(200).json({ success: true, blogs });
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



module.exports = { getAllBlogs, getBlogById, createBlog }