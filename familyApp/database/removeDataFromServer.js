const mongo = require('./mongo')
const listSchema = require('../schemas/listSchema')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            console.log(req.body.itm.slice(0, -1));
            try {
                console.log('Connected to mongodb!')

                await listSchema.deleteMany({
                    itmName: req.body.itm.slice(0, -1),
                })
            } finally {
                mongoose.connection.close()
            }
        })
    }

    connectToMongoDB()
    // res.send('respond with a resource');
});

module.exports = router;



