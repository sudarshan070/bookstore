var mongoose = require("mongoose")

var Schema = mongoose.Schema

var categeroySchema = new Schema({
    image: String,
    name: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Category", categeroySchema)