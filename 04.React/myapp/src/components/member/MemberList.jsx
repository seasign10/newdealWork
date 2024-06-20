import React,{useState, useEffect, Fragment} from 'react'
// useEffect 훅에서
// fetchMemberList() 호출해서 모든 회원정보 받아와서 목록에 출력
import {Link, useNavigate} from 'react-router-dom';
import './MemberList.css'
// import axios from 'axios';
import axios from '../../lib/axiosCreate';

export default function MemberList() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    fetchMemberList();
  }, []);

  // DELETE /api/members/:no
  const deleteMember = async(no) => {
    const url = `/api/members/${no}`;
    try{
      const response = await axios.delete(url);
      const responseData = response.data;
      // console.log(JSON.stringify(responseData));
      if(responseData.result === 'success'){
        // 삭제한 데이터를 갱신하기 위해 다시 조회
        window.location.reload();
        alert('삭제 성공: '+responseData.msg);
      }else{
        alert('삭제 실패: '+responseData.msg);
      }
    }catch(err){
      alert('Error: '+err.message);
    }
  }

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
          <Fragment key={i}>
            <li>{user.no}</li>
            <li>{user.name}</li>
            <li>{user.userid}</li>
            <li>{user.email}</li>
            <li>{user.reg_date}</li>
            <li>
            <Link to='#'
            onClick={() => {
              deleteMember(user.no);
            }}>
            삭제</Link></li>
          </Fragment>
        ))
        }
      </ul>
    </div>
  )
}