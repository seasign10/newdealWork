import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

export default function SignUp() {
  const [member, setMember] = useState({name:'', userid:'', passwd:'', passwdChk:'', email:''});

  const onSubmitHandler = (e) => {
    // 서버로 submit하는 기본 이벤트 막기
    e.preventDefault();
    // alert('회원가입 완료');
    console.log('form submitting ... ');
    requestJoin(); // 회원가입 요청을 보내는 함수 호출
  };

  const onChangeHandler = (e) => {
    // e.target의 속성 name(input의 name), value(input의 value:사용자의 입력 앖)가 출력된다.
    // console.log('e.target.name" ', e.target.name); 
    console.log('e.target.value" ', e.target.value); 

    // 비어있는 ...member에 e.target.name과 e.target.value를 추가한다.
    setMember({...member, [e.target.name]: e.target.value}); 
    console.log('member: ', member);
  };

  const requestJoin = async() => {
    let url = `/api/members`;
    try{
      const response = await axios.post(url, member);
      console.log(JSON.stringify(response));
      const responseData = response.data;
      if(responseData && responseData.result==='success'){
        alert('회원가입이 완료되었습니다.');
      }
    }catch(err){
      if(err.response && err.response.status===500||err.response.status===400){
      alert('Error: '+err.message);
    }
      
    }
  };

  return (
    <Container className='py-4'>
      <h2 className='my-3 text-center'>SignUp</h2>
      <Row>
        <Col md={8} className='offset-2'>
          <Form action='/api/members' method='post' onSubmit={onSubmitHandler}>
            <Form.Label htmlFor='name'>이름</Form.Label>
            {/* htmlFor == id 가 같아야 한다. */}
            <Form.Control type='text' id='name' onChange={onChangeHandler}
            name='name' placeholder='Name' value={member.name} />
            <div className="text-danger">이름을 입력해야 합니다.</div>

            <Form.Label htmlFor='userid'>아이디</Form.Label>
            <Form.Control type='text' id='userid' onChange={onChangeHandler}
            name='userid' placeholder='User ID' value={member.userid} />
            <div className="text-danger">아이디를 입력해야 합니다.</div>

            <Form.Label htmlFor='passwd'>비밀번호</Form.Label>
            <Form.Control type='password' id='passwd' onChange={onChangeHandler}
            name='passwd' placeholder='Password' value={member.passwd} />
            <div className="text-danger">비밀번호를 입력해야 합니다.</div>
            <Form.Label htmlFor='passwdChk'>비밀번호 확인</Form.Label>
            <Form.Control type='password' id='passwdChk' onChange={onChangeHandler}
            name='passwdChk' placeholder='Re Password' value={member.passwdChk} />
            <div className="text-danger">비밀번호가 일치하지 않습니다.</div>

            <Form.Label htmlFor='email'>이메일</Form.Label>
            <Form.Control type='email' id='email' onChange={onChangeHandler}
            name='email' placeholder='Email' value={member.email} />
            <div className="text-danger">이메일을 입력해야 합니다.</div>

            <div className='text-center py-2'>
              <Button type='submit' className='m-2' variant='outline-success'>회원 가입</Button>
              <Button type='rest' variant='outline-danger'>다시 쓰기</Button>
            </div>

          </Form>
        </Col>
      </Row>
    </Container>
  )
}