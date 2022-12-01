const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Structuur in een schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true});

//model op basis van het schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;