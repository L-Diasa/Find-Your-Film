const User = require('../../models/User')
const { ApolloError } = require('apollo-server-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const isValidEmail = email =>
/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
)

module.exports = {
    Mutation: { 
        async registerUser(__, { registerInput: { email, password } }) {
            if(!email || !isValidEmail(email)) {
                throw new ApolloError(
                    'Please enter a valid email address.'
                )
            }
            
            if(!(password.length >= 8)){
                throw new ApolloError(
                    'Your password must be at least 8 charaters.'
                )
            }

            const oldUser = await User.findOne( { email: email.toLowerCase() } )
            if(oldUser) {
                throw new ApolloError(
                    'User is already registered with the email ' + email + '.', 
                    'USER'
                )
            }

            var encryptedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            const token = jwt.sign(
                {
                    user_id: newUser._id, email
                },
                process.env.SECRET_JWT_KEY,
                { 
                    expiresIn: "2h"
                }
            )

            newUser.token = token

            const res = await newUser.save()

            return {
                id: res.id,
                ...res._doc
            }
        },
        async loginUser(__, { loginInput: { email, password } }) {
            const user = await User.findOne( { email: email.toLowerCase() } )
            if(user) {
                if(await bcrypt.compare(password, user.password)){
                    const token = jwt.sign(
                        {
                            user_id: user._id, email
                        },
                        process.env.SECRET_JWT_KEY,
                        { 
                            expiresIn: "2h"
                        }
                    )
                    user.token = token
                    return {
                        id: user.id,
                        ...user._doc
                    }
                } else {
                    throw new ApolloError('Incorrect password.', 'INCORRECT_PASSWORD')
                }
            } else {
                throw new ApolloError('User does not exist.')
            }
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID)
    }
}