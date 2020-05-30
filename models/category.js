var mongoose = require("mongoose")

var Schema = mongoose.Schema

var categeroySchema = new Schema({
    image: String,
    name: String
})

module.exports = mongoose.model("Category", categeroySchema)