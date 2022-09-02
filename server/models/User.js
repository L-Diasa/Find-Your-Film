const { Schema, model } = require('mongoose')
const { Unique } = require('typeorm')

const UserSchema = new Schema(
    { 
        email: { 
            type: String,
            required: true,
            Unique: true
        },
        password: { 
            type: String,
            required: true,
        },
        token: { 
            type: String
        }
    },
    { 
        timestamp: true
    }
)

module.exports = model("User", UserSchema)