const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:NQTRj8MZl5o88N2o@cluster0.7qkjke1.mongodb.net/TODO");

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}