// 네이버 검색 API 예제 - 블로그 검색
var express = require('express');
var app = express();

var client_id = '';
var client_secret = '';
app.get('/api/books', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/book.json?query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(5000, function () {
   console.log('http://127.0.0.1:5000/api/books?query=React app listening on port 5000!');
 });