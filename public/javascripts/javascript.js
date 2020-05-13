var count = 0    
var pre_count = 0
var java_indices = []
var python_indices = []
var cpp_indices = [] 
var cpp_modules = [];
class Queue 
{ 
    constructor() 
    { 
        var it = 0;
        this.items = []; 
    } 
    push(element) 
    { 
    this.items.push(element); 
    } 
    pop() 
    { 
    if(this.isEmpty()) 
        return "Underflow"; 
    this.items.shift(); 
    } 
    front() 
    { 
    if(this.isEmpty()) 
        return "No elements in Queue"; 
    return this.items[it]; 
    } 
    isEmpty() 
    {  
    return (this.items.length == 0); 
    } 
    size()
    {
    return this.items.length;
    }
    printQueue() 
    { 
    for(var i = 0; i < this.items.length; i++) 
        console.log(this.items[i]);  
    } 
} 
var queue = new Queue(); 
var flag = false;
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
function dfs(url,bool_flag) 
{
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () 
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var result = []; 
      result = JSON.parse(this.responseText).message;
      var end = JSON.parse(this.responseText).end;
      var i;
      for(i=0;i<result.length;i++)
      {
        queue.push(result[i]);
      }
      if(bool_flag)
      {
        var i;
      if(result.length >= 1)
      {
        if(url.includes(".java")) 
        java_indices.push(count)
        else if(url.includes(".py")) 
        python_indices.push(count)
        else if(url.includes(".cpp")) 
        cpp_indices.push(count)
        document.getElementById("code").innerHTML += "https://github.com/" + url + "\n" ; 
      }
      for(i=0;i<result.length;i++)
      {
        document.getElementById("code").innerHTML += result[i] + "\n" ;
      }
        if(result.length >= 1)
        {
          document.getElementById("code").innerHTML +=  "<br/>--------------------<br/>";
          count = count  + 1
          check_flag = true
          document.getElementById('file_desc').innerHTML = 'Number of files being Analyzed: '
          document.getElementById('file_count').innerHTML = count  + "/" + pre_count;
          if(pre_count == count)
          {
            document.getElementById('progress_bar').style.display = 'none'
            document.getElementById('complete').style.display = 'block'
            analyze(document.getElementById("code").innerHTML.split('--------------------'))
          }
        }
      }
      else
      {
      for(i=0;i<result.length;i++)
      {
         if(result[i].includes("."))
         {
            if(url.includes("master"))
            {
            if(result[i].includes(".java") || result[i].includes(".cpp") || result[i].includes(".py"))
            {
              pre_count = pre_count + 1;
              dfs(url + "/" + result[i],true)
            } 
            else if(result[i].includes(".h"))
              cpp_modules.push(result[i])
          }
            else
            {
              if(result[i].includes(".java") || result[i].includes(".cpp") || result[i].includes(".py"))
              {
                pre_count = pre_count + 1;
                dfs(url + "/blob/master/" + result[i],true)
              }
              else if(result[i].includes(".h"))
              cpp_modules.push(result[i])
            }
            
         }
         else
         {
          if(url.includes("master"))
          {
            if(end == "true")
            {
              dfs(url + "/" + result[i],false);
            }
            else
            {
              dfs(url + "/" + result[i],true);
            }
          }
          else
          {
            if(end == "true")
            {
              dfs(url + "/tree/master/" + result[i],false)
            }
            else
            {
              dfs(url + "/tree/master/" + result[i],true); 
            }     
          }
         }
      }
      }
    }      
  }
  xhttp.open("POST","/analysis",true)
  xhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded")
  xhttp.send('link='+url)  
}
function analyze(arr)
{
  var java_modules = [];var py_modules = [];
  var java_fileNames = [];var py_fileNames = [];var cpp_fileNames = [];
  var jl = java_indices.length;
  var pl = python_indices.length
  var cpl = cpp_indices.length
  document.getElementById('later_processing').style.display = 'block'
  document.getElementById('n_java').innerHTML += jl
  document.getElementById('n_py').innerHTML += pl
  document.getElementById('n_cpp').innerHTML += cpl
  for(var i=0;i<jl;i++)
  {
    var localArr = arr[java_indices[i]].split("\n")
    var path = [];path = localArr[0].split("master")[1].split("/");
    java_fileNames.push(path[path.length-1])
    for(var y=0;y<path.length-1;y++)
    {
      if(path[y] != "")
      java_modules.push(path[y])
    }
    java_modules = [...new Set(java_modules)]
  }
  java_fileNames = [...new Set(java_fileNames)]
  for(var i=0;i<pl;i++)
  {
    var localArr = arr[python_indices[i]].split("\n")
    var path = [];path = localArr[0].split("master")[1].split("/");
    py_fileNames.push(path[path.length-1])
    for(var y=0;y<path.length-1;y++)
    {
      if(path[y] != "")
      py_modules.push(path[y])
    }
    py_modules = [...new Set(py_modules)]
  }
  py_fileNames = [...new Set(py_fileNames)]
  for(var i=0;i<cpl;i++)
  {
    var localArr = arr[cpp_indices[i]].split("\n")
    var path = [];path = localArr[0].split("master")[1].split("/");
    cpp_fileNames.push(path[path.length-1])
    for(var y=0;y<path.length-1;y++)
    {
      if(path[y] != "")
      cpp_modules.push(path[y])
    }
    cpp_modules = [...new Set(cpp_modules)]
  }
  cpp_fileNames = [...new Set(cpp_fileNames)]
  for(var i=0;i<jl;i++)
  {
    var java_fd = 0; var java_md = [];
    var localArr = arr[java_indices[i]].split("\n")
    var path = [];path = localArr[0].split("master")[1].split("/");
    document.getElementById('d_java').innerHTML += java_fileNames[i] + ":- " 
    for(var y=1;y<localArr.length;y++)
    {
      if(localArr[y].includes("import") || localArr[y].includes('package'))
      {
        var tmp_flag = false;
        var import_path = localArr[y].split(" ")[1].split(".")
        // console.log(import_path)
        var commons1 = 0;
        for(var a=0;a<import_path.length;a++)
        {
          if(a == import_path.length-1)
          {
            for(var b=0;b<java_fileNames.length;b++)
            {
              if(import_path[0].split(";")[0] == java_fileNames[b].split(".java")[0])
              {
                tmp_flag = true;
                java_fd += 1
                commons1 += 1;
                break
              }
            }
          }
          for(var b=0;b<java_modules.length;b++)
          {
            if(a == import_path.length-1)
            {
            if(import_path[a].split(";")[0] == java_modules[b])
            {
              commons1 += 1
              break
            }
            }
            else 
            {
            if(import_path[a] == java_modules[b])
            {
              commons1 += 1
            }
            }
            
          }
        if(commons1 == import_path.length)
        {
          java_md =  localArr[y].split(" ")[1].split(".");
          if(tmp_flag)
          {
            java_md.pop();
          }
          java_md = [...new Set(java_md)]
          document.getElementById('d_java').innerHTML += localArr[y].split(" ")[1].replace(/\./g, "/") + " ";
        }
        }
      }
    }
    document.getElementById('d_java').innerHTML += "<br> # of file-dependencies: " + java_fd + "<br> # of module-dependencies: " + java_md.length;
    document.getElementById('d_java').innerHTML += "<br>-------<br>";
  }

  for(var i=0;i<pl;i++)
  {
    var py_fd = 0; var py_md = [];
    var localArr = arr[python_indices[i]].split("\n")
    var path = [];path = localArr[0].split("master")[1].split("/");
    document.getElementById('d_py').innerHTML += py_fileNames[i] + ":- " 
    for(var y=1;y<localArr.length;y++)
    {
      if(localArr[y].includes("import") || localArr[y].includes('from'))
      {
        var tmp_flag = false;
        var import_path = localArr[y].split(" ")[1].split(".")
        var commons1 = 0;
        for(var a=0;a<import_path.length;a++)
        {
          if(a == import_path.length-1)
          {
            for(var b=0;b<py_fileNames.length;b++)
            {
              if(import_path[0].split(";")[0] == py_fileNames[b].split(".py")[0])
              {
                tmp_flag = true;
                py_fd += 1;
                commons1 += 1;
                break
              }
            }
          }
          for(var b=0;b<py_modules.length;b++)
          {
            if(a == import_path.length-1)
            {
              if(import_path[a].split(";")[0] == py_modules[b])
              {
                commons1 += 1
                break
              }
            }
            else 
            {
              if(import_path[a] == py_modules[b])
              {
                commons1 += 1
              }
            } 
          }
        if(commons1 == import_path.length)
        {          
        py_md =  localArr[y].split(" ")[1].split(".");
        if(tmp_flag)
        {
          py_md.pop();
        }
        py_md = [...new Set(py_md)]
        document.getElementById('d_py').innerHTML += localArr[y].split(" ")[1].replace(/\./g, "/") + " ";
        }
      }
      }
    }
    document.getElementById('d_py').innerHTML += "<br> # of file-dependencies: " + py_fd + "<br> # of module-dependencies: " + py_md.length;    
    document.getElementById('d_py').innerHTML += "<br>-------<br>";
  }
  console.log(cpp_modules)
  for(var i=0;i<cpl;i++)
  {
    var tmp_flag = false;
    var cpp_fd = 0; var cpp_md = [];
    var localArr = arr[cpp_indices[i]].split("\n")
    var path = [];path = localArr[0].split("master")[1].split("/");
    document.getElementById('d_cpp').innerHTML += cpp_fileNames[i] + ":- " 
    for(var y=1;y<localArr.length;y++)
    {
      if(localArr[y].includes("include"))
      {
        var import_path = [];
        if(!localArr[y].includes("<") && localArr[y].includes("/"))
        import_path = localArr[y].split(" ")[1].split('"')[1].split("/")
        else if (!localArr[y].includes("<") && !localArr[y].includes("/")) 
        {
          import_path.push(localArr[y].split(" ")[1].split('"')[1])
        }
        console.log(import_path)
        var commons1 = 0;
        for(var a=0;a<import_path.length;a++)
        {
          if(a == import_path.length-1)
          {
            for(var b=0;b<cpp_fileNames.length;b++)
            {
              if(import_path[0] == cpp_fileNames[b].split(".cpp")[0])
              {
                tmp_flag = true;
                cpp_fd += 1
                commons1 += 1;
                break
              }
            }
          }
          for(var b=0;b<cpp_modules.length;b++)
          {
            if(a == import_path.length-1)
            {
            if(import_path[a] == cpp_modules[b])
            {
              commons1 += 1
              break
            }
            }
            else 
            {
            if(import_path[a] == cpp_modules[b])
            {
              commons1 += 1
            }
            }
            
          }
        if(commons1 == import_path.length)
        {
          cpp_md =  localArr[y].split(" ")[1].split(".");
          if(tmp_flag)
          {
            cpp_md.pop();
          }
          cpp_md = [...new Set(cpp_md)]
          document.getElementById('d_cpp').innerHTML += localArr[y].split(" ")[1] + " ";
        }
       
        }
             
      }
    }
    document.getElementById('d_cpp').innerHTML += "<br> # of file-dependencies: " + cpp_fd + "<br> # of module-dependencies: " + cpp_md.length;
    document.getElementById('d_cpp').innerHTML += "<br>-------<br>";
  }
}
function analysis() 
{ 
    document.getElementById('progress_bar').style.display = 'block' 
    document.getElementById('file_display').style.display = 'block'
    setTimeout(() => {
      console.log(document.getElementById('link').value)
      dfs(document.getElementById('link').value,false)  
    }, 2000);    
}