var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('D:\\documents\\NCP-project\\mongoTest\\public\\html\\index.html', { title: 'Upload File' })
});

module.exports = router;
