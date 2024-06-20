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

// 4. express 서버 라우팅
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});