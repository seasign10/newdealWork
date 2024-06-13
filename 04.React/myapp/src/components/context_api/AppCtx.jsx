import React, {useState, createContext} from 'react'

const UserContext = createContext('unknown');
//UserContext 안에 {Provider, Consumer}가 들어있다.

export default function AppCtx() {
  const [userId, setUserId] = useState('페이커');
  return (
    <div className='py-4 container text-center'>
      {/* 데이터 공급자 */}
      <UserContext.Provider value={userId}>
        <h1>Context Api 사용하기</h1>
        <h2>AppCtx(부모-Provider)</h2>
        <hr />
        <Profile />
      </UserContext.Provider>
    </div>
  )
}

function Profile(){
  return (
    <div className='alert alert-primary'>
      <h3>My Profile</h3>
      <p>
        Context를 이용해 데이터를 전달받습니다.
      </p>
      <Greeting />
    </div>
  )
}

function Greeting(){
  return (
    <UserContext.Consumer>
      {(userName)=>(
        <div className='alert alert-warning'>
          <h4>저는 프런트엔드 개발자 {userName} 입니다.</h4>
        </div>)}
    </UserContext.Consumer>
  )
}

