let express = require('express');
let router = express.Router();

router.get('/api', function (req, res, next) {
    res.send('API');
});

module.exports = router;