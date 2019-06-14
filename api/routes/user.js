const router = require('express').Router()
const { register, getAllUser, login } = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')

// Login router
router.post('/login', login)

// Register router
router.post('/register', register)

// Gell all user router
router.get('/', authenticate, getAllUser)

module.exports = router