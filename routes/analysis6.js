var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
  req.header('Access-Control-Allow-Origin', '*')
  var url = "https://github.com/"+req.body.link;
  console.log(url)
  const request = require('request')
  const cheerio = require('cheerio')
    var ans = [];
    url = "https://github.com/"+req.body.link;
    request(url,(error,response,html)=>{
        if(!error && response.statusCode == 200)
        {
            // commits
          const $ = cheerio.load(html)
          $('.num.text-emphasized').each((i,el)=>{
              
            var item = $(el).text()
            ans.push(item)
            
          })
  
        }
        res.json({message: ans})
    })
    
    
});

module.exports = router;
