import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
// useParams : url에 경로에서 동적인 세그먼트를 가져오는데 사용
// ex) /users/:id 와 같은 경로에서 :id 부분은 동적인 파라미터로 간주된다.
// userParams를 사용하면 이 같은 파라미터를 쉽게 가져올 수 있다.
import { userData } from '../data/userData';

export default function UserDetail() {

  const {id} = useParams();
  const [user, setUser] = useState({id:0, name:'', userId:'', addr:''});

  // useEffect(callback, [의존성 배열])
  // 컴포넌트가 마운트/update/언마운트...렌더링 될 때마다 호출
  useEffect(()=>{
    // userData배열을 돌면서 id와 일치하는 객체 데이터를 찾아
    // setUser(findUser)로 user 상태를 변경
    let findUser = {};

    // findUser = userData.find((user) => user.id === parseInt(id));
    // 또는
    for(let i=0; i<userData.length; i++) {
      let obj = userData[i];
      if (obj.id === Number(id)) {
        findUser = obj;
        break;
      }else{
        findUser = {id:0, name:'', userId:'', addr:''};
      }
    }
    setUser(findUser);
  }, [id]); // 여기서의 id는 useParams()에서 가져온 id

  return (
    <div className='container py-4'>
      <h1 className='p-3'>UserDetail [ {id} 번 회원정보]</h1>
      {// user.id가 0이 아니고 user.userId가 존재하면
        user.id!==0&&user.userId? 
        <div className="alert alert-primary my-3">
          <h2>MyPage</h2>
          <h3>Name: {user.name}</h3>
          <h3>User ID: {user.userId}</h3>
          <h3>Address: {user.addr}</h3>
        </div>
        :
        <div className="alert alert-danger">
          <h3>{id}번 회원 정보는 없습니다.</h3>
        </div>
      }
    </div>
  )
}
