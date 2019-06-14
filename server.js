// Imports all module
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const contactRoute = require('./api/routes/contact')


// Connection with database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/contacts_db', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection
db.on('error', (err) => {
	console.log(err)
})
db.once('open', () => {
	console.log('Database connection established')
})


const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/contacts', contactRoute)

app.get('/', (req, res) => {
	res.send('<h1>Welcome to rest api course</h1>')
})

// Server listing port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
