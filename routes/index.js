var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('GET HOME PAGE');
    res.render('index.html');
});

//Module.exports makes "router" publicly accessible to anything outside this file
module.exports = router;