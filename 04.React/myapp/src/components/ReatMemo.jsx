import React, { useCallback } from 'react'
import { useState } from 'react'

export default function ReactMemo() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <div className='container py-4 text-center'>
      <h2>React.memo()를 이용한 최적화</h2>
      <hr />
      <button onClick={useCallback(()=>{
        setCount(current=>current+1);
      },[])} 
      className='btn btn-secondary mx-1'>Count를 증가</button>
      <button onClick={useCallback(()=>{
        setValue(current=>current+1);
      },[])} 
      className='btn btn-warning'>Value를 증가</button>
      <hr />
      Count: {count}
      <ChildComp value={value} ></ChildComp>
    </div>
  )
}

// props epdlxj(value)가 변경될 때 재 렌더링이 발생
// 부모의 count 값이 변경되어도 렌더링이 발생하지 않는다.
const ChildComp = React.memo((props)=>{
  const {value} = props;
  console.log('Render ChildComp...');
  return (
    <div className='alert alert-warn'>
      <h3>ChildComp</h3>
      <br />
      <h2>Value: {value}</h2>
    </div>
  )
}) // 함수안에 함수를 받는 것을 고차함수라고 한다.