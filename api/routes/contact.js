const router = require('express').Router()
const { 
    getAllContacts, 
    postNewContact, 
    getSingleContact, 
    deleteSingleContact,
    editSingleContact
} = require('../controllers/contactController')

// get
router.get('/', getAllContacts)

// post
router.post('/', postNewContact)

// get single contact
router.get('/:id', getSingleContact)

// update single contact
router.put('/:id', editSingleContact)

// Delete single contact
router.delete('/:id', deleteSingleContact)

module.exports = router