var mongoose = require("mongoose")

var Schema = mongoose.Schema

var reviewSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)