import React, { useState, createContext, useContext } from 'react';
// React.createContext(기본값) ===> {Provider, Consumer}

// 전역 함수로 호출
const MemberContext = createContext('unknown');

export default function App() {
  const [userId, setUserId] = useState('김연경');
  return (
    <div>
      <MemberContext.Provider value={userId}>
        <h1>useContext() 훅을 사용하여 Provider가 공급하는 데이터를 사용하자</h1>
        <br />
        아이디:
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <br />
        <Profile />
      </MemberContext.Provider>
    </div>
  );
}

function Profile() {
  return (
    <div className="alert alert-dark">
      <h3>My Profile</h3>
      <p>Context를 이용해 데이터를 전달받습니다.</p>
      <Greeting />
    </div>
  );
}

function Greeting() {
  const userId = useContext(MemberContext); // Consumer 대신 사용

  return (
    <div className="alert alert-light">
      <h4>저는 풀스텍 개발자 {userId} 입니다.</h4>
    </div>
  );
}
