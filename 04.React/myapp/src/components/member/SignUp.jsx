import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import axios from '../../lib/axiosCreate';

export default function SignUp() {
  const [member, setMember] = useState({name:'', userid:'', passwd:'', email:''});
  const [cmmError, setCmmError] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [passwdChk, setPasswdChk] = useState('');
  // const [useridError, setUseridError] = useState(false);

  const navigate=useNavigate();

  const onSubmitHandler = (e) => {
    // 서버로 submit하는 기본 이벤트 막기
    e.preventDefault();
    // 유효성 체크
    if(!member.name){ // 이름이 없으면
      setCmmError(true);
      return;
    }
    if(!member.userid){ // 아이디가 없으면
      setCmmError(true);
      return;
    }
    if(member.passwd != passwdChk){ // 비밀번호가 일치하지 않으면  
      setPasswdError(true);
      return;
    }

    console.log('form submitting ... ');
    requestJoin(); // 회원가입 요청을 보내는 함수 호출
  };

  const onChangeHandler = (e) => {
    // e.target의 속성 name(input의 name), value(input의 value:사용자의 입력 앖)가 출력된다.
    // console.log('e.target.value" ', e.target.value); 

    // 비어있는 ...member에 e.target.name과 e.target.value를 추가한다.
    setMember({...member, [e.target.name]: e.target.value}); 
    // console.log('member: ', member);
  };
    const onChangePasswdHandler=(e)=>{
        // 비밀번호와 비밀번호 확인 값이 다르면 bool에 true할당, 같으면 false
        let bool = e.target.value !== member.passwd 
        setPasswdError(bool)
        setPasswdChk(e.target.value)
    }

  const requestJoin = async() => {
    let url = `/api/members`;
    try{
      const response = await axios.post(url, member);
      // console.log(JSON.stringify(response));
      const responseData = response.data;
      if(responseData && responseData.result==='success'){
        setCmmError(false);
        setPasswdError(false);
        alert('회원가입이 완료되었습니다.');
        navigate('/signin');
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
            <Form.Label htmlFor='name'>*이름</Form.Label>
            {/* htmlFor == id 가 같아야 한다. */}
            <Form.Control type='text' id='name' onChange={onChangeHandler}
            name='name' placeholder='Name' value={member.name} />
            {cmmError &&
              <div className="text-danger">이름을 입력해야 합니다.</div>
            }

            <Form.Label htmlFor='userid'>*아이디</Form.Label>
            <Form.Control type='text' id='userid' onChange={onChangeHandler}
            name='userid' placeholder='User ID' value={member.userid} />
            {cmmError &&
              <div className="text-danger">아이디를 입력해야 합니다.</div>
            }

            <Form.Label htmlFor='passwd'>*비밀번호</Form.Label>
            <Form.Control type='password' id='passwd' onChange={onChangeHandler}
            name='passwd' placeholder='Password' value={member.passwd} />
            {cmmError&& <div className="text-danger">비밀번호를 입력해야 합니다.</div>}
            
            <Form.Label htmlFor='passwdChk'>*비밀번호 확인</Form.Label>
            <Form.Control type='password' id='passwdChk' 
            onChange={onChangePasswdHandler}
            name='passwdChk' placeholder='Re Password' value={passwdChk} />
            {passwdError&& <div className="text-danger">비밀번호가 일치하지 않습니다.</div>}

            <Form.Label htmlFor='email'>이메일</Form.Label>
            <Form.Control type='email' id='email' onChange={onChangeHandler}
            name='email' placeholder='Email' value={member.email} />
            {cmmError&& <div className="text-danger">이메일을 형식에 맞지않습니다.</div>}

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