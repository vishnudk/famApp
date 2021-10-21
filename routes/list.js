var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.send('D:\\documents\\NCP-project\\familyApp\\public\\html\\index.html', { title: 'Express' })
    res.sendFile('D:\\documents\\NCP-project\\familyApp\\public\\html\\list.html', { title: 'Express' })
    // res.render('D:\\documents\\NCP-project\\familyApp\\public\\html\\index.html', { title: 'Express' });
});

module.exports = router;
