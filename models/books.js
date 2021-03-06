var mongoose = require("mongoose")

var Schema = mongoose.Schema

var bookSchema = new Schema({
    image: String,
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    detail: String,
    price: String,
    publisher: String,
    stock: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Book", bookSchema)