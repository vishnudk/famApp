const mongo = require('./mongo')
const listSchema = require('../schemas/listSchema')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log('Connected to mongodb!')
                console.log(req.body.itm);
                const user = {
                    itmName: req.body.itm
                }

                await new listSchema(user).save()
            } finally {
                console.log('data added to the database');
                mongoose.connection.close()
            }
        })
    }

    connectToMongoDB()
    res.send('respond with a resource');
});

module.exports = router;

