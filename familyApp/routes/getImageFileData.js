const request = require('request');

var express = require('express');
const cookieParser = require('cookie-parser');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, respo, next) {
    var result = {};
    request('http://localhost:3000/files', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log("===============");
        console.log(body);
        console.log("===============");

        result['data'] = body;
        console.log(result);
        // respo.json(result);
        respo.json(result);
        // console.log(body.explanation);
    });
});

module.exports = router;
