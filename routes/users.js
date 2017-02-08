var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/admin');
});

router.get('/admin', function(req, res, next){
  res.render('admin');
})

module.exports = router;
