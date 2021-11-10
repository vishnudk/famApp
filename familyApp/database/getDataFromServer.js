const mongo = require('./mongo')
const listSchema = require('../schemas/listSchema')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    const connectToMongoDB = async () => {
        await mongo().then(async (mongoose) => {
            try {
                console.log('Connected to mongodb!')

                const result = await listSchema.find()
                console.log('Result:', result);
                res.json({ 'result': result });
            } finally {
                mongoose.connection.close()
            }
        })
    }

    connectToMongoDB()
    // res.send('respond with a resource');
});

module.exports = router;



