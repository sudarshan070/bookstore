var mongoose = require("mongoose")

var Schema = mongoose.Schema

var bookSchema = new Schema({
    image: String,
    title: {
        type: String,
        required: true
    },
    authore: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    detail: String,
    price: String,
    publisher: String,
    stock: String
})

module.exports = mongoose.model("Book", bookSchema)