var express = require('express');
var app = express();
var result;

app.get('/', function (req, res) {
   res.send('Hello World');
})
 
app.get('/student_login', function (req, res) {
  result = {"status":0, msg:"登录成功"}
  res.send(result);
})

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})