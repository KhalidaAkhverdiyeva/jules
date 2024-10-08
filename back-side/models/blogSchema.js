const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    detailedDesc: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    detailedImg: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Blog", BlogSchema);