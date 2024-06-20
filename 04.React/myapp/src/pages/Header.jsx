import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'
import { useSigninUser } from '../components/member/SigninUserContext';

export default function Header() {
  const {user, signoutUser} = useSigninUser();
  // context로 부터 user, signoutUser를 받아옴

  const onSingout = () => {
    signoutUser();// 로그아웃 처리 Provider가 공급하는 user를 null로 변경
  }

  return <div className="header">
    <ul>
      <li>
      {/* 
      가능하면 a태그를 사용X
      - a태그를 사용하면 백엔드에 요청을 보내서 페이지를 새로 받아오는 것이기 때문에 페이지가 새로고침(reload)된다.
      - react router를 사용하면 페이지가 새로고침되지 않고,
        페이지가 변경되는 것을 react가 인지해서 페이지를 변경해주기 때문에 더 빠르게 페이지를 변경할 수 있다.
      */}
        <Link to="/">Home</Link>
      </li>
      {!user&&
        <>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
        </>
      }
      {user&&
        <>
          <li className='bg-warning'>
            <Link to="#">{user.userid}님 로그인 중</Link>
          </li>
          <li>
            <Link to="#" onClick={onSingout}>SignOut</Link>
          </li>
        </>
      }
      <li>
        <Link to="/comp1">MyComp1</Link>
      </li>
      <li>
        <Link to="/members">Members</Link>
      </li>
    </ul>
  </div>;
}
