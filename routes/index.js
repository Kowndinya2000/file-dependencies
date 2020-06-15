var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,**Authorization**');
  res.render('index',{
    message:req.query.m,end:req.query.m2})
});

module.exports = router;
