var express = require('express');
var users = require('../users_info');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.redirect('/users/admin');
});

router.get('/admin', function (req, res, next) {
  res.locals.message = '';
  res.render('admin');
});

router.post('/admin', function (req, res, next) {
  var name = req.body.name;
  var pass = req.body.pass;
  if (name && users[name] && users[name].pass === pass) {
    req.session.regenerate(function (err) {
      if (!err) {
        req.session.name = name;
        res.redirect('/')
      } else {
        res.locals.message = "发生一些错误";
        res.render('admin');
      }
    })
  } else {
    res.locals.message = "账户不存在或者密码错误";
    res.render('admin');
  }
});

module.exports = router;