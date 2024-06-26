// mysqlite3
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// 1. 서버 포트 설정
const PORT = process.env.PORT || 5000; //process.env.PORT : 환경변수에 PORT가 있으면 그걸로 사용하고 없으면 5000번 포트로 사용

// 2. 미들웨어 설정
app.use(cors()); // cors 에러 해결
app.use(bodyParser.json()); // json 형식으로 데이터 주고 받기

// 3. db 접속 : mysqlite3
const dbPath = path.join(__dirname, 'testDB.db');
console.log(dbPath);

let db = new sqlite3.Database(dbPath, (err) => {
  if(err){
    console.log("Error:", err.message);
  }else{
    console.log("sqlite3 DB connected");
  }
});

app.post('/api/members', (req, res) => {
  const { name, userid, passwd, email } = req.body;
  let sql = `INSERT INTO member (name, userid, passwd, email, reg_date) 
              VALUES (?, ?, ?, ?, datetime('now', 'localtime'))`;
  let userData=[name, userid, passwd, email];
  db.run(sql, userData, (err)=>{
    if(err){
      return res.status(500).json({ error: err.message });
    }
    res.json({result: 'success', msg:`${name}님 정보 DB 삽입 성공`});
  });
});

app.get('/api/members', (req, res) => {
  console.log('GET /api/members');
  const sql = `SELECT no, name, userid, passwd, email, 
  strftime('%Y-%m-%d', reg_date) reg_date FROM member ORDER BY no ASC`;
  db.all(sql, [], (err, rows) => {
    if(err)return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.delete('/api/members/:no', (req, res) => {
  const no = req.params.no;
  const sql=`delete from member where no = ?`;
  db.run(sql, no, (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json({result: 'success', msg: `${no}번 회원정보 삭제 성공`});
  });
});

app.post('/api/signin', (req, res) => {
  const {userid, passwd} = req.body;
  console.log(userid, passwd)
  const sql = `select no, name, userid, email from member where userid=? and passwd=?`;
  db.all(sql, [userid, passwd], (err, result) => {
    console.log('result: ', result);
    if(result.length>0){
      const user = result[0];
      res.json({result: 'success',msg: `${user.name}님 환영합니다` , 
      data: {no: user.no, name: user.name, userid: user.userid}});
      return;
    }else{
      res.json({result: 'fail', msg: '아이디 또는 비밀번호가 일치하지 않습니다.'});
    }
  });
});

/////board/////
// 총 게시글
app.get('/api/boardTotal', (req, res) => {
  const sql = `SELECT COUNT(id) AS totalCount FROM board`;
  
  db.get(sql, [], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(row);
  });
});
// 게시글 등록
app.post('/api/boards', (req, res) => {
  // post 방식의 body 데이터 받기
  const {title, userid, content} = req.body; 
  if(!title||!userid||!content){
    return res.status(400).send('제목, 작성자, 내용을 입력하세요.');
  }
  const sql = `insert into board (title, userid, content, wdate, readnum) 
  values (?, ?, ?, datetime('now', 'localtime'), 0)`;
  db.run(sql, [title, userid, content], (err) => {
    if(err){
      return res.status(500).json({error: err.message});
    } 
    res.json({result: 'success', msg: '게시글이 등록되었습니다.'});
  });
});
// 게시글 목록 보기
app.get('/api/boards', (req, res) => {
  // offset 파라미터값 받기
  let offset = req.query.offset;
  if(!offset) offset = 0;
  const sql = `select id, title, userid, content, 
              strftime('%Y-%m-%d', wdate) wdate, readnum,
              (select count(rid) from reply where board_id=B.id) replyCnt 
              from board B order by id desc limit 5 offset ${offset}`;
  db.all(sql, [], (err, result) => {
    if(err)return res.status(500).send(err);
    res.json(result);
  });
});
// 게시글 상세보기 && 수정 게시글 조회
app.get('/api/boards/:id', (req, res) => {
  const id = req.params.id;
  console.log('id:', id);
  const sql = `select id, title, userid, content, 
              strftime('%Y-%m-%d', wdate) wdate, readnum from board where id=?`;
  db.all(sql, [id], (err, result) => {
    if(err)return res.status(500).send(err);
    res.json(result);
  });
});
// 게시글 조회수
app.put('/api/boardReadnum/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE board SET readnum = readnum + 1 WHERE id = ?`;
  db.run(sql, [id], (err)=>{ // db.run을 사용하고, function의 this를 사용하기 위해 화살표 함수가 아닌 일반 함수를 사용합니다.
    if (err) {return res.status(500).send(err);}
    // this.changes는 쿼리에 의해 변경된 행의 수를 반환
    if (this.changes > 0) {
      res.json({ result: 'success' });
    } else {
      res.json({ result: 'fail' });
    }
  });
});
// 게시글 삭제
app.delete('/api/boards/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM board WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) return res.status(500).send(err);
    if (this.changes > 0) {
      res.json({ result: 'success', msg: '게시글이 삭제되었습니다.' });
    } else {res.json({ result: 'fail', msg: '게시글 삭제에 실패했습니다.' });}
  });
});

// 게시글 수정
app.put('/api/boards/:id', (req, res) => {
  // 글번호
  const id = req.params.id;
  // 수정한 글내용 받기
  const { title, userid, content } = req.body;
  console.log(title, userid, content);

  const sql = `UPDATE board SET title = ?, userid = ?, content = ? WHERE id = ?`;

  db.run(sql, [title, userid, content, id], function(err) {
    if (err) return res.status(500).send(err);
    if (this.changes > 0) {
      res.json({ result: 'success', msg: '게시글이 수정되었습니다.' });
    }else{
      res.json({ result: 'fail', msg: '게시글 수정에 실패했습니다.' });
    }
  });
});
// 댓글 추가
app.post(`/api/boards/:id/reply`, (req, res)=>{
  const board_id = req.params.id;
  const {userid, content} = req.body;
  const sql = `INSERT INTO reply(userid, content, board_id, wdate) values(?,?,?, datetime('now'))`;
  db.run(sql, [userid, content, board_id], (err)=>{
    if(err)return res.status(500).send(err);
    res.json({result: 'success', msg: '댓글이 추가되었습니다.'});
  })
})
// 게시글에 대한 댓글 목록
app.get(`/api/boards/:id/reply`, (req, res)=>{
  const board_id = req.params.id;
  const sql = `select * from reply where board_id = ?`;
  db.all(sql, [board_id], (err, result)=>{
    if(err)return res.status(500).send(err)
    res.json(result);
  });
});
// 댓글 삭제
app.delete(`/api/boards/reply/:rid`, (req, res)=>{
  const rid = req.params.rid;
  const sql = `delete from reply where rid = ?`;
  db.run(sql, [rid], (err)=>{
    if(err)return res.status(500).send(err);
    res.json({result: 'success', msg: '댓글이 삭제되었습니다.'});
  });
});
// 댓글 수정
app.put(`/api/boards/:id/reply/:rid`, (req, res)=>{
  const {rid} = req.params;
  const {userid, content} = req.body;
  const sql = `update reply set userid=?, content=?, wdate=datetime('now') where rid=?`;
  db.run(sql, [userid, content, rid], (err)=>{
    if(err)return res.status(500).send(err);
    res.json({result: 'success', msg: '댓글이 수정되었습니다.'});
  });
});


// 4. express 서버 라우팅
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});




// serverNaver.js ///////////////////////////////////
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
//  app.listen(5000, function () {
//    console.log('http://127.0.0.1:5000/api/books?query=React app listening on port 5000!');
//  });