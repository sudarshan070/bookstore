var mongoose = require("mongoose")
var bcrypt = require("bcrypt")

var Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (this.password && this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    }
})

userSchema.method.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema)