import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Figure } from 'react-bootstrap'

//https://reqres.in/api/users/1

export default function SingleUser() {
  const {id} =useParams()
  const [user, setUser] = useState({})
  // const {first_name, last_name, email, avatar} = user;
  
  // fetch() 이용, get 방식으로 요청
  const getUserInfo = ()=>{
    let url = `https://reqres.in/api/users/${id}`;
    console.log('url:', url);
    fetch(url)
    .then(res=>res.json())
    .then(resData=>{
      if(!resData.data){
        alert('데이터가 없습니다.');
        return;
      }
      // console.log(resData.data);
      setUser(resData.data);
    })
    .catch(err=>{
      console.error('에러:', err);
    })
  } 

  useEffect(()=>{
    getUserInfo();
  }, [id])
  // 의존성 배열에 id를 넣어주자, id가 변경될 때마다 
  // getUserInfo() 함수를 호출해서 새로운 사용자 정보를 가져오기 위함

  return (
    <div>
      <h1>회원 정보</h1>
      {user!=null && // user가 null이 아닐 때만 실행
      <>
        <Figure>
          <Figure.Image src={user.avatar} width={170} height={180} />
          <Figure.Caption>
            {user.first_name} {user.last_name}
          </Figure.Caption>
        </Figure>
        <h3>Id: {id}</h3>
        <h3>Name: {user.first_name} {user.last_name}</h3>
        <h3>Email: {user.email}</h3>
      </>
      }
    </div>
  )
}