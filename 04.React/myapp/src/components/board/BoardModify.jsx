import React,{useState, useEffect, useRef} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../lib/axiosCreate'

export default function BoardModify() {
  const [form, setForm] = useState({title:'', userid:'', content:''});

  const refTitle = useRef();
  const refUserid = useRef();
  const refContent = useRef();

  const {id} = useParams(); // 수정할 글번호 받기
  const navigate = useNavigate();

  useEffect(() => {
    getBoard();
  },[id]);

  // 조회 /api/boards/11 >> 11번 게시글 조회
  const getBoard = async () => {
    const response = await axios.get(`/api/boards/${id}`)
    console.log(response.data);
    if(response.data.length===1){
      setForm(response.data[0]);
    }else{
      alert('해당 게시글이 존재하지 않습니다.');
      navigate('/post');
    }
  }

  const {title, userid, content} = form; // form.title, form.userid, form.content
  const onSubmitHandler = (e)=>{
    e.preventDefault();
    if(!title.trim()){
      alert('제목, 작성자, 내용을 입력하세요.');
      refTitle.current.focus();
      return;
    }else if(!userid.trim()){
      alert('작성자를 입력하세요.');
      refUserid.current.focus();
      return;
    }else if(!content.trim()){
      alert('내용을 입력하세요.');
      refContent.current.focus();
      return;
    }
    // 수정 PUT /api/boards/11 >> 11번 게시글 수정
    requestModify();
  }
  const requestModify = async () => {
    try{
      const response = await axios.put(`/api/boards/${id}`, form) // 수정할 글번호로 axios.put, 수정할 데이터
      if(response.data.result==='success'){
        alert(response.data.msg);
        navigate(`/post/${id}`);
      }
    }catch(err){
      alert('Error:'+err.response.status)
    }
  }

  const onChangeHandler = (e)=>{
    // e.target.name : input의 name
    // e.target.value : 사용자가 입력한 값
    setForm({... form, [e.target.name]: e.target.value})
  }

  const onResetHandler = ()=>{
    setForm({...form, title:'', userid:'', content:''})
  }

  return (
    <>
      <Row className="my-3">
        <Col className="p-3 mx-auto" md={8}>
          <h1 className="text-center">Board Modify</h1>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="p-3 mx-auto" md={8}>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>제 목</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={onChangeHandler}
                ref={refTitle}
                value={form.title}
                placeholder="제목을 입력하세요"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>작성자</Form.Label>
              <Form.Control
                type="text"
                name="userid"
                onChange={onChangeHandler}
                ref={refUserid}
                value={form.userid}
                placeholder="작성자를 입력하세요"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>내 용</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                name="content"
                onChange={onChangeHandler}
                ref={refContent}
                value={form.content}
                placeholder="내용 입력하세요"
              ></Form.Control>
            </Form.Group>
            <div className="my-2 text-center">
              <Button type="submit" variant="success" className="m-2">
                글 수 정
              </Button>
              <Button type="reset" onClick={onResetHandler} variant="warning">
                다시쓰기
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}
