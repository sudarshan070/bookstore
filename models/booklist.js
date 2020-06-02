var mongoose = require("mongoose")

var Schema = mongoose.Schema

var booklistSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book"
    },
    qty: {
        type: Number,
        default: 0
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
}, { timestamps: true })


module.exports = mongoose.model("BookList", booklistSchema)