const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const listSchema = mongoose.Schema({
    itmName: String
})

module.exports = mongoose.model('famapplists', listSchema)