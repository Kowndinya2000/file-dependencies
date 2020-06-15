function loadbar() 
    {
        var ovrl = document.getElementById("overlay"),
        img = document.getElementsByClassName('ifrms'),
        c = 0;
        tot = img.length;
        function imgLoaded(){
            c += 1;
            var perc = ((100/tot*c) << 0) +"%";
            if(c===tot) return doneLoading();
        }
        function doneLoading()
        {
            ovrl.style.opacity = 0;
            setTimeout(function(){ 
                ovrl.style.display = "none";
            }, 1200);
        }
        for(var i=0; i<tot; i++) 
        {
            var tImg     = new Image();
            tImg.onload  = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src     = img[i].src;
        }    
    }
;(function()
{
    loadbar()   
    document.addEventListener('DOMContentLoaded', loadbar, false);
}());
window.console = window.console || function(t) {};
if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
}
var cod;
function metaf1(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      document.getElementById('metadata').style.display = 'block'
      cod += '<tr><td>' + JSON.parse(this.responseText).stargazers_count + '</td>';
      cod += '<td>' + JSON.parse(this.responseText).forks_count + '</td>';
      metaf2(url)
    }      
  }
  xhttp.open("GET","https://api.github.com/repos/"+url,false)
  xhttp.send() 

}
function metaf2(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>' 
      metaf21(url)
    }      
  }
  xhttp.open("POST","/analysis",false)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  
  xhttp.send('link='+url)
}
function metaf21(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf22(url)
    }      
  }
  xhttp.open("POST","/analysis2",false)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  
  xhttp.send('link='+url)
}
function metaf22(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf23(url)
    }      
  }
  xhttp.open("POST","/analysis3",false)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  
  xhttp.send('link='+url)
}
function metaf23(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'  
      metaf24(url)
    }      
  }
  xhttp.open("POST","/analysis4",false)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  
  xhttp.send('link='+url)
}
function metaf24(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf25(url)
    }      
  }
  xhttp.open("POST","/analysis5",false)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  
  xhttp.send('link='+url)
}
function metaf25(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf3(url)
    }      
  }
  xhttp.open("POST","/analysis6",false)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  
  xhttp.send('link='+url)
}
function metaf3(url) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = JSON.parse(this.responseText);
      cod += '<td>'
      for(var i=0;i<result.length-1;i++)
      {
          console.log(result[i])
          cod += result[i].commit.author.date + "," 
      }

      cod += result[result.length-1].commit.author.date + '</td></tr>'
      document.getElementById('mdata').innerHTML += cod
    }      
  }
  xhttp.open("GET","https://api.github.com/repos/"+url+"/commits",false)
  xhttp.send()
}
function analysis() 
{ 
    setTimeout(() => {
        var list = ['grpc/grpc',
        'msgpack/msgpack-c',
        'nlohmann/json',
        'danmar/cppcheck',
        'Mooophy/Cpp-Primer',
        'gabime/spdlog',
        'abseil/abseil-cpp',
        'catchorg/Catch2',
        'TheAlgorithms/C-Plus-Plus',
        'lballabio/QuantLib',       
        ]
        for(var i=0;i<list.length;i++)
        {
            cod = ""
            metaf1(list[i])
        }
      
    }, 100);    
}