const router = require('express').Router()
const { register, getAllUser, login } = require('../controllers/userController')

// Login router
router.post('/login', login)

// Register router
router.post('/register', register)

// Gell all user router
router.get('/', getAllUser)

module.exports = router