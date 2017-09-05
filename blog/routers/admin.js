let express = require('express');
let router = express.Router();

console.log(11);
router.get('/', function (req, res, next) {
    res.send('admin');
});

module.exports = router;