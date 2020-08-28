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
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart:{
        type:Schema.Types.ObjectId,
        ref:'Cart'
    },
    image: String,
    googleId: String,
    verification: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    isblock:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (this.password && this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    }
})

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema)