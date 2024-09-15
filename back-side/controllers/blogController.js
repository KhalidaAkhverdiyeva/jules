const mongoose = require("mongoose");
const bloglist = require("../models/blogSchema");
const { ErrorHandler } = require("../utils/ErrorHandlers");
const moment = require('moment');




const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await bloglist.find();

        if (!blogs.length) {
            return next(new ErrorHandler("No blogs found", 404));
        }

        const formattedBlogs = blogs.map(blog => ({
            ...blog._doc,
            createdAt: moment(blog.createdAt).format('MMM DD, YYYY')
        }));

        res.status(200).json({ success: true, blogs: formattedBlogs });
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
        const { title, description, detailedDesc, author } = req.body;
        const uploadedImage = req.files.image ? req.files.image[0].path.replace(/\\/g, '/') : null;
        const uploadedDetailedImg = req.files.detailedImg ? req.files.detailedImg[0].path.replace(/\\/g, '/') : null;

        const newBlog = await bloglist.create({
            title,
            description,
            detailedDesc,
            author,
            image: uploadedImage,
            detailedImg: uploadedDetailedImg,
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
const updateBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return next(new ErrorHandler("Invalid Blog ID format", 400));
        }

        const updateData = {
            title: req.body.title,
            description: req.body.description,
            detailedDesc: req.body.detailedDesc,
            author: req.body.author,
            image: req.files?.image ? req.files.image[0].path.replace(/\\/g, '/') : req.body.image,
            detailedImg: req.files?.detailedImg ? req.files.detailedImg[0].path.replace(/\\/g, '/') : req.body.detailedImg
        };

        const updatedBlog = await bloglist.findByIdAndUpdate(blogId, updateData, { new: true });

        if (!updatedBlog) {
            return next(new ErrorHandler("Blog not found", 404));
        }

        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (error) {
        next(error);
    }
};



module.exports = { getAllBlogs, getBlogById, createBlog, deleteBlog, updateBlog }