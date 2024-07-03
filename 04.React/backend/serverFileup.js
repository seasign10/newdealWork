const express = require('express');
const cors = require('cors');
const multer = require('multer');// 파일 업로드 시 사용

const path = require('path');
const { log } = require('console');
const sqlite3 = require('sqlite3').verbose();

const app=express();

const PORT=5000;
// npm i --s multer

const dbPath = path.join(__dirname, 'testDB.db');
let db = new sqlite3.Database(dbPath, (err) => {
  if(err){
    console.log("Error:", err.message);
  }else{
    console.log("sqlite3 DB connected");
  }
});

// 파일 저장 위치와 파일명 설정
const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, 'uploads/'); // 파일 저장 위치 // backend/uploads/에 업로드 될 예정
  },
  filename: function(req, file, callback){
    callback(null, Date.now()+"_"+file.originalname); // 파일명 설정
    // 파일명: 업로드한 날짜 시간 정보 _ 파일명.확장자
  }
});

app.use(cors());
// 정적 파일 제공 설정
app.use('/uploads', express.static('uploads')); // 업로드된 파일을 접근할 수 있도록
// 파일 업로드 설정
const upload = multer({storage:storage})
app.post('/api/postUpload', upload.single('attach'), (req, res)=>{// 파일 하나 업로드
  let originalname='';
  if(!req.file){
    console.log('파일 업로드 실패');
  }else{
    // 첨부 파일이 있다면
    originalname = req.file.originalname; // a.png > 원본 파일명 (논리적 파일명)
    console.log(`첨부파일명: ${originalname}`); // 171956..._a.png < 실제 업로드된 파일명 (물리적 파일명) > DB에 저장
    // 실제 업로드된 파일명을 DB에 저장
    storageFilename=req.file.filename;
    console.log(`업로드된 파일명: ${storageFilename}`);
  }
  const {userid, title, content} = req.body;
  console.log(userid, title, content);
  const params = [userid, title, content, storageFilename];
  const sql = `INSERT INTO post (userid, title, content, attach, reg_date) 
                VALUES (?, ?, ?, ?, datetime('now', 'localtime'))`;
  db.run(sql, params, (err) => {
    if (err) {return res.status(500).json({ error: err.message });}
    res.json({ result: 'success' });
  })
}); 

// post list
app.get('/api/postList', (req, res)=>{
  const sql = `select id, userid, title, content, attach, 
  strftime('%Y-%m-%d %H:%M:%S', reg_date)reg_date from post order by id desc`;
  db.all(sql, [], (err, result) => {
    if (err) {return res.status(500).json({ error: err.message });}
    res.json(result);
  })
})

app.listen(PORT, ()=>{
  console.log(`serverFileup.js is running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
