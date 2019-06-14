const Contact = require('../models/Contact')

const getAllContacts = (req, res, next) => {
    Contact.find()
        .then(data => {
            res.status(200).json({
                message: 'All contacts',
                contact: data
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


const postNewContact = (req, res, next) => {
    const { name, phone, email } = req.body
    const contact = new Contact({
        name,
        phone,
        email
    })

    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Contact saved',
                contact: data
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


const getSingleContact = (req, res, next) => {
    let id = req.params.id
    Contact.findById(id)
        .then(data => {
            res.status(200).json({
                message: `Your contact for id ${id}`,
                contact: data
            })
        })
        .catch(err  => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                error: err
            })
        })
}


const editSingleContact = (req, res, next) => {
    let id = req.params.id

    const { name, phone, email } = req.body
    let updatedContact = {
        name, phone, email
    }

    Contact.findByIdAndUpdate(id, {$set: updatedContact})
        .then(data => {
            Contact.findById(data._id)
                .then(newContact => {
                    res.status(200).json({
                        message: 'Contact updated successfully',
                        contact: newContact
                    })
                })
                .catch(err  => {
                    console.log(err)
                    res.status(500).json({
                        message: 'Error occured',
                        error: err
                    })
                })
            
        })
        .catch(err  => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                error: err
            })
        })
}


const deleteSingleContact = (req, res, next) => {
    let id = req.params.id
    Contact.findByIdAndRemove(id)
        .then(data => {
            res.json({
                message: 'Contact deleted',
                contact: data
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
    getAllContacts,
    postNewContact,
    getSingleContact,
    editSingleContact,
    deleteSingleContact
}
