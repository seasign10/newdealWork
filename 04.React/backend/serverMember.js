// mysql
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// 1. 서버 포트 설정
const PORT = process.env.PORT || 5000; //process.env.PORT : 환경변수에 PORT가 있으면 그걸로 사용하고 없으면 5000번 포트로 사용

// 2. 미들웨어 설정
app.use(cors()); // cors 에러 해결
app.use(bodyParser.json()); // json 형식으로 데이터 주고 받기

// 3. db 접속 : mysql
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '19951027',
  port: 3306,
  database: 'testDB',
});

// req: 요청과 관련된 객체
// res: 응답과 관련된 객체 >>> 브라우저와 연결되어 있다.
// MPA 방식
app.get('/api/hello', (req, res)=>{
  // charset=utf-8 : 한글 깨짐 방지
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Hello Node.js</h1>');
  res.write('<h2>리액트와 연동할 백엔드 서버입니다.</h2>');
})
// SPA 방식
app.get('/api/json', (req, res) => {
  const data = {
    title: 'Hi NodeJS',
    msg: 'JSON 유형의 데이터를 응답으로 보냅니다.',
  }
  res.json(data);
})
// Restfull 방식
// 요청 메서드에 따라 비즈니스 로직을 달리 구성
// GET /api/members : 모든 회원정보 조회
// GET /api/members/:id : 특정 회원정보 조회
// POST /api/members : 회원정보 추가
// DELETE /api/members/:id : 특정 회원정보 삭제
// PUT /api/members/:id : 특정 회원정보 수정
app.post('/api/members', (req, res) => {
  // 사용자가 입력한 데이터를 받아온다. >> req 통해서 받는다. post 방식: req.body
  const { name, userid, passwd, email } = req.body;
  console.log(name, userid, passwd, email);

  const sql = `INSERT INTO member SET ? `;
  const userData = { name, userid, passwd, email };

  // 두번째 커넥션을 사용할 때는 pool.getConnection()을 사용한다.
  pool.getConnection((err, con) => {
    if(err) return res.status(500).json(err) // 에러 발생시 500 상태코드로 응답
    con.query(sql, userData, (err, result)=>{
      // conn : sql문을 실행 > 그 결과를 콜백함수에 전달
      con.release(); // DB 연결 자원 반납 : 접속자 수 제한을 두기 위해
      if(err){err} return res.status(500).json(err);
      res.json({result: 'success', msg: `${name}님 정보 DB 삽입 성공`});
      
    })
  });

});

app.get('/api/members', (req, res) => {
  console.log('GET /api/members');
  const sql = `SELECT no, name, userid, passwd, email, date_format(regdate, '%Y-%m-%d')regdate FROM member ORDER BY no ASC`;
  
  positionLocal.getConnection((err, con) => {
    if(err) return res.status(500).json(err);
    con.query(sql, (err, result) => {
      con.release();
      if(err) return res.status(500).json(err);
      res.json(result);
    });
  });
});

// get 방식
// ?query=react&display=12 >> 쿼리 스트링
// req.query.query, req.query.display
// post 방식의 body 데이터 >> req.body.name, req.body.userid
// path방식의 데이터 /api/members/10 >> req.params.no
app.delete('/api/memvbers/:no', (req, res) => {
  const no = req.params.no;
  console.log('삭제할 회원번호', no);
  if(!no){
    res.json({result: 'fail', msg: '회원번호가 존재하지 않습니다.'});
    return;
  }
  const sql = `DELETE FROM member WHERE no = ?`;
  pool.getConnection((err, con) => {
    if(err) return res.status(500).json(err);
    con.query(sql, [no], (err, result) => {
      // console.log('result', result); 
      if(result.affectedRows > 0){// sql문에 의해 영향받은 행의 수를 반환
        res.json({result: 'success', msg: `${no}번 회원정보 삭제 성공`});
        return;
      }else{
        res.json({result: 'fail', msg: `${no}번 회원이 존재하지 않습니다.`});
      }
    });
  });
});

// 4. express 서버 라우팅
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});