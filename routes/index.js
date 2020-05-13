var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index',{
    message:req.query.m, end: req.query.m2})
});

module.exports = router;
