import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../../lib/axiosCreate';

export default function BoardForm({onMode}) {

  const initData = {
    title: '',
    userid: '',
    content: '',
  };

  const [form, setForm] = useState(initData);

  const refTitle = useRef();
  const refUserid = useRef();
  const refContent = useRef();

  const navigate = useNavigate();

  let uid=null; // 로그ㅡ인한 사람의 userid값 받을 예정 
  useEffect(() => {
    // 세션 스토리지에 저장된 userInfo가 있는지 꺼내보자
    let str=sessionStorage.getItem('userInfo');
    // alert(str, typeof str);
    if(str!==null){
      const user = JSON.parse(str); // parse > stringfy와 반대
      uid=user.userid; // uid애 로그인한 사람의 아이디 할당
      setForm({...form, userid:uid}); // 로그인한 사람의 아이디를 form.userid에 할당
    }else{
      alert('로그인이 필요합니다.');
      navigate('/signin');
    }
  },[]);

  const onChangeHandler = (e) => {
    // [키]:값
    const frmdata = { ...form, [e.target.name]: e.target.value };
    // console.log(frmdata);
    setForm(frmdata);
  };

  const onSubmitHandler = (e) => {
    // axios로 요청해야 하므로,form을 submit 하지 못하게 기본 이벤트를 막는다.
    e.preventDefault();
    const {userid, title, content} = form;
    if(!title.trim()){
      alert('제목을 입력하세요');
      refTitle.current.focus();
      return;
    }
    if(!userid.trim()){
      alert('작성자를 입력하세요');
      refUserid.current.focus();
      return;
    }
    if(!content.trim()){
      alert('내용을 입력하세요');
      refContent.current.focus();
      return;
    }
    requestBoardWrite();
  };

  const requestBoardWrite=()=>{
    axios.post('/api/boards', form)
    .then(response=>{
      // console.log(JSON.stringify(response.data));
      if(response.data.result==='success'){
        onMode('list');
        alert(response.data.msg);
      }else{
        alert('게시글 등록에 실패했습니다');
        onResetHandler();
      }
    })
    .catch(err=>{
      console.warn(err);
    })
  };

  const onResetHandler = () => {
    setForm({...form, ...initData});
    refTitle.current.focus();
  };

  return (
    <>
      <Row className="my-3">
        <Col className="p-3 mx-auto" md={8}>
          <h1 className="text-center">Board Write</h1>
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
                onChange={onChangeHandler} readOnly
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
                글 쓰 기
              </Button>
              <Button type="reset" onClick={onResetHandler} variant="warning">
                다시쓰기
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
