const User = require('../models/User')
const bcrypt = require('bcrypt')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            email: req.body.email,
            password: hash
        })

        user.save()
            .then(data => {
                res.status(201).json({
                    message: 'User registration successfull',
                    user: data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'Error occured',
                    error: err
                })
            })

    })
}


const login = (req, res, next) => {
    let { email, password } = req.body

    User.findOne({email})
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: 'Error occured',
                            error: err
                        })
                    }
                    if (result) {
                        res.json({
                            message: 'Login successfull'
                        })
                    } else {
                        res.json({
                            message: 'Login faild. Password doesn\'t match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'User not found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                error: err
            })
        })

}


const getAllUser = (req, res, next) => {
    User.find()
        .then(data => {
            res.status(200).json({
                message: 'All users',
                users: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                error: err
            })
        })
}


module.exports = {
    register,
    getAllUser,
    login
} 