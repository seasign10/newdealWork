import React,{useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Form, Button} from 'react-bootstrap';
import axtios from '../../lib/axiosCreate';

// value 로 받은 모든정보를 받을 수 있음
import {useSigninUser} from './SigninUserContext';

export default function SigninForm() {
  const idRef = useRef();
  const passwdRef = useRef();
  const [signinUser, setSigninUser] = useState({userid:'', passwd:''});

  // 로그인 처리를 위해 userSigninUser로 부터 signinAuthUser를 받아옴
  const {signinAuthUser} = useSigninUser();
  //////////////////////////////////////////////////////////
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if(!signinUser.userid){
      alert('ID를 입력하세요');
      idRef.current.focus();
      return;
    }
    if(!signinUser.passwd){
      alert('Password를 입력하세요');
      passwdRef.current.focus();
      return;
    }
    // 로그인 요청
    requestSingin();
  }
  const requestSingin = () => {
    axtios.post('/api/signin', signinUser)
    .then((response=>{
      // console.log(JSON.stringify(response.data));
      const res = response.data;
      if(res.result === 'success'){
        const authUser = res.data;
        signinAuthUser(authUser); // 인증받은 no, name, userid를 SigninUserContext에 저장 
        console.log('authUser:', authUser);
        alert(res.msg);
        navigate('/'); // 홈페이지로 이동
    }else{
      alert(res.msg);
      setSigninUser({...signinUser, userid:'', passwd:''});
    }
    }))
    .catch((err=>{
      console.log(err.response.data.message);
    }))
  }

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setSigninUser({...signinUser, [name]: value});
    console.log(signinUser);
  }

  return (
    <div>
      <Row className='my-5 SigninForm'>
        <Col className='p-5 mx-auto' xs={10} sm={10} md={6}>
          <h2 className='text-center my-4'>Sign in</h2>
          <Form method='post' onSubmit={onSubmit}>
            <Form.Group className="my-2">
              <Form.Label htmlFor='userid'>ID</Form.Label>
              <Form.Control type='text' 
              id='userid' name='userid'
              onChange={onChangeInput}
              value={signinUser.userid}
              ref={idRef}
              placeholder='ID' />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label htmlFor='passwd'>Password</Form.Label>
              <Form.Control type='password' 
              id='passwd' name='passwd'
              onChange={onChangeInput}
              value={signinUser.passwd}
              ref={passwdRef}
              placeholder='Password' />
            </Form.Group>
            <div className="d-grid gap-2 my-3">
              <Button type='submit' variant='success'>Singin</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
