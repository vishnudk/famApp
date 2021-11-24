const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,

}

const listSchema = mongoose.Schema({
    date: String,
    todo: String
})

module.exports = mongoose.model('famappcalendar', listSchema)