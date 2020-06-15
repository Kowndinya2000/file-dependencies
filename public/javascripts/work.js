function loadbar() {
  var ovrl = document.getElementById("overlay"),
    img = document.getElementsByClassName('ifrms'),
    c = 0;
  tot = img.length;
  function imgLoaded() {
    c += 1;
    var perc = ((100 / tot * c) << 0) + "%";
    if (c === tot) return doneLoading();
  }
  function doneLoading() {
    ovrl.style.opacity = 0;
    setTimeout(function () {
      ovrl.style.display = "none";
    }, 1200);
  }
  for (var i = 0; i < tot; i++) {
    var tImg = new Image();
    tImg.onload = imgLoaded;
    tImg.onerror = imgLoaded;
    tImg.src = img[i].src;
  }
}
; (function () {
  loadbar()
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());
window.console = window.console || function (t) { };
if (document.location.search.match(/type=embed/gi)) {
  window.parent.postMessage("resize", "*");
}
var cod;
function metaf1(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText).message)
      document.getElementById('metadata').style.display = 'block'
      cod += '<tr><td>' + JSON.parse(this.responseText).message[1] + '</td>';
      cod += '<td>' + JSON.parse(this.responseText).message[2] + '</td>';
      metaf2(url)
    }
  }
  xhttp.open("POST", "/analysis7", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")
  xhttp.send('link=' + url)

}
function metaf2(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf21(url)
    }
  }
  xhttp.open("POST", "/analysis", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")

  xhttp.send('link=' + url)
}
function metaf21(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf22(url)
    }
  }
  xhttp.open("POST", "/analysis2", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")

  xhttp.send('link=' + url)
}
function metaf22(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf23(url)
    }
  }
  xhttp.open("POST", "/analysis3", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")

  xhttp.send('link=' + url)
}
function metaf23(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf24(url)
    }
  }
  xhttp.open("POST", "/analysis4", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")

  xhttp.send('link=' + url)
}
function metaf24(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td>'
      metaf25(url)
    }
  }
  xhttp.open("POST", "/analysis5", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")

  xhttp.send('link=' + url)
}
function metaf25(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = []
      result = JSON.parse(this.responseText).message;
      console.log(result)
      cod += '<td>' + result[0] + '</td></tr>'
      document.getElementById('mdata').innerHTML += cod
      //metaf3(url)
    }
  }
  xhttp.open("POST", "/analysis6", false)
  xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")

  xhttp.send('link=' + url)
}
function metaf3(url) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.responseText);
      cod += '<td>'
      for (var i = 0; i < result.length - 1; i++) {
        console.log(result[i])
        cod += result[i].commit.author.date + ","
      }

      cod += result[result.length - 1].commit.author.date + '</td></tr>'
      document.getElementById('mdata').innerHTML += cod
    }
  }
  xhttp.open("GET", "https://api.github.com/repos/" + url + "/commits", false)
  xhttp.send()
}
function analysis() {
  setTimeout(() => {
    var list = ['python-mechanize/mechanize', 'raojianxiong/Python36', 'realpython/cookiecutter-flask-skeleton', 'realpython/materials', 'relekang/python-semantic-release', 'reviewboard/reviewboard', 'rlvaugh/Impractical_Python_Projects', 'rochacbruno/dynaconf', 'rstojnic/lazydata', 'sethmlarson/python_project_template', 'SFDO-Tooling/CumulusCI', 'shekkizh/ImageProcessingProjects', 'SoCo/SoCo', 'tecladocode/rest-api-sections', 'truebit/xUnique', 'TutorialDoctor/Pythonista-Projects', 'uoip/monoVO-python', 'votesmart/python-votesmart', 'weixuqin/PythonProjects', 'wsvincent/djangox', 'zhebrak/raftos', 'zhisheng17/Python-Projects']
    // 22 elements
    var list2 = ['PragmaticIT/xiconify', 'PacktPublishing/C-8-and-.NET-Core-3-Projects-Using-Azure-Second-Edition', 'dotnetcore/WebApiClient', 'winnster/DotRas', 'getgauge-examples/gauge-example-csharp', 'royosherove/dotnet-perfplus', 'sschmid/EntitasPure', 'trashvin/Tutorial_UsingStateless', 'CypherCore/CypherCore', 'cs-util-com/cscore', 'lxconan/clrViaTest', 'zeros-team/Projects', 'LaunchCodeLiftoffProjects/Late_Night_Snacks', 'anton-bot/Full-Emoji-List', 'pandaedward/refaction', 'kwwwvagaa/NetWinformControl', 'curiosity-inc/azure-kinect-dk-unity', 'A9T9/Free-OCR-API-CSharp', 'mbdavid/FileDB', 'Patagames/Pdf.WinForms', 'spatialos/CsharpBlankProject', 'JackWangCUMT/NetGanttControl', 'OpenEpl/EProjectFile', 'JesseKPhillips/CsharpActiveX', 'SohaibAjmal/DataMining-Project-CSharp', 'ishani/ClangVSx', 'iQuarc/Geco', 'sarn1/example-aspnet-mvc', 'OlgaRacu/TeamProject-POS-PointOfSales', 'zyrif/Project-JobBoard', 'sjdirect/abotx', 'ArturT/Game-of-Life', 'Hitman666/nbCcTalkCoinAcceptor', 'Equipple/vs-templates-revit-addin', 'olegil/SqlBulkTools', 'Travelport/travelport-uapi-tutorial-c-sharp', 'MarkPThomas/HeadFirst-CSharp', 'uow-dmurrell/ProjectorControl', 'TanvirArjel/CustomValidation']
    // 39 elements in list2
    for (var i = 0; i < list.length; i++) {
      cod = ""
      metaf1(list[i])
    }

  }, 100);
}