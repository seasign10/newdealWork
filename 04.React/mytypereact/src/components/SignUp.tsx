import React,{useState, ChangeEvent, FormEvent} from 'react'
// import { Button } from 'react-bootstrap';
import axios from '../lib/axiosCreate';
import {AxiosResponse} from 'axios';
import { log } from 'console';

export interface User {
  name:string;
  userid:string;
  passwd:string|undefined;
  email:string|undefined;
}
export interface ResponseUserData{
  result:string;
  data:User;
}

export default function Signup() {
  const [user, setUser] = useState<User>({name:'', userid:'', passwd: '', email: ''});
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [useridErr, setUseridErr] = useState<boolean>(false);
  const [passwdErr, setPasswdErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);

  const onSubmit=(e:FormEvent<HTMLFormElement>):void=>{
    // 유효성 체크
    e.preventDefault();
    // 정규식 > RegExp 객체 : test() 메서드
    // 메타문자 : +, *, ?, ., $, ^, |, (, ), [, ], {, }, \
    // / : 정규식 패턴의 시작과 끝을 표시
    // ^ : 시작, $ : 끝
    // /^[가-힣a-zA-Z]$/ : 한글 또는 영문자로 시작하고 끝나는 문자열
    // /^[a-zA-Z][a-zA-Z0-9_-!]{3,7}$/ : 영문자로 시작하고, 숫자, _-!를 포함한 4~8자리
    let isName:boolean = /^[a-zA-Z가-힣]{2,20}$/.test(user.name);
    // 패턴.test(값) : 값이 패턴에 맞으면 true, 아니면 false

    if(!user.name.trim()){
      alert('이름을 입력해 주세요.');
      return;
    }else if(!isName){
      setNameErr(true);
      return;
    }else{ // 에러가 발생하지 않으면 에러메시지를 초기화한다.
      setNameErr(false);
    }
    
    // \ : 이스케이프 문자 : 특수문자를 문자로 인식하게 한다.
    let isUserid:boolean = /^([a-zA-Z])[a-zA-Z0-9_\-!]{3,7}$/.test(user.userid);
    if(!user.userid.trim()){
      alert('아이디를 입력해 주세요.');
      return;
    }else if(!isUserid){
      setUseridErr(true);
      return;
    }else setUseridErr(false);

    // + : 1회 이상 반복 | 1개 이상
    // * : 0회 이상 반복 | 0개 이상
    // ? : 0회 또는 1회 반복 | 0개 또는 1개
    if(user.passwd!==undefined){
      // \w == [a-zA-Z0-9_] 
      let isPasswd:boolean = /^[\w!_-]{4,8}$/.test(user.passwd);
      if(!isPasswd){setPasswdErr(true); return;}else setPasswdErr(false);
    }else{
      alert('비밀번호를 입력해 주세요.')
      return;
    };

    if(user.email!==undefined){
      let isEmail:boolean = /^[a-zA-Z][\w]*@[a-zA-Z0-9]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/.test(user.email);
      // alert(isEmail);
      if(!isEmail){setEmailErr(true); return;}else setEmailErr(false);
    }else{
      alert('이메일을 입력해 주세요.')
      return;
    };

    if(nameErr||useridErr||passwdErr||emailErr){
      return;
    }else{
      requestJoin();
    }
  }
  const requestJoin=async()=>{ // async는 반환하는 값이 있으므로 void를 사용하지 않는다.
    try{
      const response:AxiosResponse<ResponseUserData> 
      = await axios.post('/api/members', user);

      const responseData:ResponseUserData = response.data;
      
      if(responseData && responseData.result === 'success'){
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      }else{
        alert('회원가입에 실패했습니다. 한번 더 시도해 주세요.');
      }
    }catch(err:any){
      // 콜론(,)을 사용하면, 문자열만 받기 때문에, JSON.stringify 함수는 + 연산자를 사용하여 문자열로 변환한다.
      alert('Error: ' + JSON.stringify(err.response))
    }
  }
  const onChangeValue=(e:ChangeEvent<HTMLInputElement>):void=>{
    setUser({...user, [e.target.name]:e.target.value})
  }

  return (
    <div className='contianer'>
      <div className='col-8 offset-2'>
        <h1 className='text-center m-5'>SignUp</h1>
        <form onSubmit={onSubmit}>

          <table className='table'>
            <tr>
              <td style={{width: '20%'}} className='text-center'>
                <label htmlFor="">이름</label>
              </td>
              <td>
                <input type="text" name='name' 
                onChange={onChangeValue}
                value={user.name}
                className='form-control' />
                {nameErr&& <div className='text-danger'>이름은 한글 또는 영문자만 가능합니다.</div>}
              </td>
            </tr>
            <tr>
              <td style={{width: '20%'}} className='text-center'>
                <label htmlFor="">아이디</label>
              </td>
              <td>
                <div className='d-flex justify-content-between p-0'>
                  <input type="text" name='userid' 
                  onChange={onChangeValue}
                  value={user.userid}
                  className='form-control' style={{width: '70%'}} />
                  <button type='button' className='btn btn-light' style={{whiteSpace:'nowrap'}}>중복 확인</button>
                </div>
                {useridErr&& <div className='text-danger'>아이디는 영문으로 시작해야하며, 숫자, _-!를 포함한 4~8자리만 가능합니다.</div>}
              </td>
            </tr>
            <tr>
              <td style={{width: '20%'}} className='text-center'>
                <label htmlFor=""  style={{whiteSpace:'nowrap'}}>비밀번호</label>
              </td>
              <td>
                <input type="password" name='passwd' 
                onChange={onChangeValue}
                value={user.passwd}
                className='form-control' />
                {passwdErr&& <div className='text-danger'>비밀번호는 영문, 숫자, _-! 4~8자리만 가능합니다.</div>}
              </td>
            </tr>
            <tr>
              <td style={{width: '20%'}} className='text-center'>
                <label htmlFor="">이메일</label>
              </td>
              <td>
                <input type="email" name='email' 
                onChange={onChangeValue}
                value={user.email}
                className='form-control' />
                {emailErr&& <div className='text-danger'>이메일 형식이 맞지 않습니다.</div>}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type='submit' className='btn btn-success'>회원가입</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  )
}
