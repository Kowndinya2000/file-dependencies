var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
  req.header('Access-Control-Allow-Origin', '*')
  var url;
  console.log(url)
  const request = require('request')
  const cheerio = require('cheerio')
    var ans = [];
    url = "https://github.com/"+req.body.link + "/issues";
        request(url,(error,response,html)=>{
          if(!error && response.statusCode == 200)
          {
            // open issues
            const $ = cheerio.load(html)
            $('.btn-link.selected').each((i,el)=>{ 
              var item = $(el).text().replace(/\s\s+/g,'').split('Open')[0]
              console.log(item)
              ans.push(item)    
            })
          }  
          res.json({message: ans}) 
    })   
    
});

module.exports = router;
