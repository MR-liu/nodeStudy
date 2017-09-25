var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.send('MAIN');
    res.render('main/index')
});

module.exports = router;