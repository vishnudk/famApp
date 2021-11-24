var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    return res.redirect('http://localhost:8080');
    // res.sendFile('D:\\documents\\NCP-project\\familyApp\\public\\html\\chat.html', { title: 'Express' })
    // res.sendFile('D:\\documents\\NCP-project\\chatApp\\Realtime-Simple-Chat-App\\index.html', { title: 'Express' })

});

module.exports = router;
