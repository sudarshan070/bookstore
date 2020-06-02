var mongoose = require("mongoose")
var Schema = mongoose.Schema

var cartSchema = new Schema({
    bookList: [
        {
            type: Schema.Types.ObjectId,
            ref: "BookList"
        }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })
module.exports = mongoose.model("Cart", cartSchema)