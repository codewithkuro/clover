var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET studio page. */
router.get('/', function(req, res) {

  // read all files in uploads directory

  const files = fs.readdirSync('public/images/uploads')
  res.render('studio', { title: 'Express', files });
});

module.exports = router;
