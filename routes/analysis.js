var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
  req.header('Access-Control-Allow-Origin', '*')
  var url = "https://github.com/"+req.body.link;
  const request = require('request')
  const cheerio = require('cheerio')

  if(!req.body.link.includes(".java") && !req.body.link.includes(".cpp") && !req.body.link.includes(".py"))
  {
    String.prototype.splice = function(idx,rem,str)
    {
      return this.slice(0,idx) + str + this.slice(idx+Math.abs(rem))
    }
    var ans = [];
    request(url,(error,response,html)=>{
      if(!error && response.statusCode == 200)
      {
        const $ = cheerio.load(html)
        var count = 0;
        $('.js-navigation-open').each((i,el)=>{
          count++
          var item = $(el).text()
          if(count >=4 && item != "..")
          {
            if(item.includes(" "))
            {
              var i = 0;
              while(item[i] != ' ')
              {
                i++;
              }
              item = item.splice(i,1,"%20")
            }
            ans.push(item)
          }
        })
      }
      res.json({message: ans,end: "true"})
    })
  }
  else
  {
    var ans = []
    request(url,(error,response,html)=>{
      if(!error && response.statusCode == 200)
      {
        const $ = cheerio.load(html)
        const rt = $('.text-mono.f6.flex-auto.pr-3.flex-order-2.flex-md-order-1.mt-2.mt-md-0').text().replace(/\s\s+/g,'').split("lines")
        var str = rt[0]
        var integer = parseInt(str,10)
        for(var i=1;i<=integer;i++)
        {
          var cat = "#LC"
          cat = cat + i
          $(cat).each((i,el)=>{
            const item = $(el).text()
            ans.push(item)
          })
        }
      }
      res.json({message: ans,end: "false"})
    })
  }
});

module.exports = router;
