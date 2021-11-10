const mongoose = require('mongoose')
var userName = 'ncpProject'

const mongoPath = 'mongodb+srv://' + userName + ':ncpproject@cluster0.13bcs.mongodb.net/testFileEnter?retryWrites=true&w=majority';
module.exports = async () => {
    await mongoose.connect(mongoPath, {
        itmName: true
    })

    return mongoose
}