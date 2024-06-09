var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // read all files in uploads directory

  const files = fs.readdirSync('public/images/uploads')
  res.render('index', { title: 'Express', files });
});

module.exports = router;
