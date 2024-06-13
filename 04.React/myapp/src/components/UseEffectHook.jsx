import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function UseEffectHook() {

  const [count, setCount] = useState(0);
  
  // document.title = `Clicked ${count} times`;
  // componentDidMount, componentDidUpdate의 역할을 한다.
  // useEffect(콜백함수) : 마운트 되고 state, props가 변경될 때마다 호출된다.
  useEffect(()=>{
    console.log('useEffect componentDidMount : count='+count);
    document.title = `Clicked ${count} times`;

    // 옵션 : 함수를 반환할 수도 있다.
    // 이 함수에서는 effect를 해제할 필요가 있을 경우에 아래의 반환 함수 안에서 기술
    return ()=>{
      // unmount, update 전에 호출되므로 그 사이에 필요한 작업을 기술
      // 리소스 반납, 이벤트 해제 등
      console.log('CleanUp : '+count);
    }

  },[count])
  // 두 번째 매개변수로 의존성 배열을 넣어준다.
  // 빈 배열 [] 을 넣으면 첫번째 렌더링 후에만 useEffect 콜백 함수가 호출된다.
  // 의존성 배열에 특정 state를 넣으면 해당 state가 변경될 때만 useEffect 콜백 함수가 호출된다.

  return (
    <div className="py-5 text-center">
      <h1>UseEffectHook</h1>
      <h1>You Clicked {count} times</h1>
      <br />
      <Button onClick={()=>{
        setCount(count+1);
      }} variant="outline-warning">Click Me</Button>
    </div>
  );
}
