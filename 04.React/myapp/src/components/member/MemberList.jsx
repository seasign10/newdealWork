import React,{useState, useEffect} from 'react'
// useEffect 훅에서
// fetchMemberList() 호출해서 모든 회원정보 받아와서 목록에 출력
import './MemberList.css'
import axios from 'axios';

export default function MemberList() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    fetchMemberList();
  }, []);

  const fetchMemberList = async() => {
    let url = '/api/members';
    try{
      const response = await axios.get(url);
      const responseData = response.data;
      // console.log(JSON.stringify(responseData));
      setMemberList(responseData);
    }catch(err){
      alert('Error: '+err.message);
    }

  }
  
  return (
    <div>
      <h2 className='text-center'>모든 회원 목록</h2>
      <ul className='MemberList'>
        <li>번호</li>
        <li>이름</li>
        <li>아이디</li>
        <li>이메일</li>
        <li>등록일</li>
        <li>삭제</li>
        {memberList.map((user, i) => (
          <>
            <li>{user.no}</li>
            <li>{user.name}</li>
            <li>{user.userid}</li>
            <li>{user.email}</li>
            <li>{user.reg_date}</li>
            <li>삭제</li>
          </>
        ))
        }
      </ul>
    </div>
  )
}