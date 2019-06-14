const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')


const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    }
})

const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact
