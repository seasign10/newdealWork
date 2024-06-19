import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';

export default function UseCallbackHook() {
  const [count, setCount] = useState(0);

  const handleClick1 = () => {
    console.log('handleClick1');
    // setCount(count+1);
    // 또는
    setCount((current) => current + 1);
  };

  // useCallback을 사용하여 함수를 캐시, 메모제이션 된다.
  const handleClick2 = useCallback(() => {
    console.log('handleClick2');
    setCount((current) => current + 1);
  }, []
  )

  return (
    <div className="container py-4 text-center">
      <h1>UseCallbackHook 사용</h1>
      <h2>콜백 함수를 캐시</h2>
      <hr />
      <div className="text-danger">Coumt: {count}</div>
      <hr />
      <ChildComp 
      handleClick1={handleClick1}
      handleClick2={handleClick2}
       />
    </div>
  );
}
function ChildComp({handleClick1, handleClick2}) {
  return (
    <div>
      <h3 className="mb-3">Child Comp</h3>
      <Button onClick={handleClick1} variant='success' className="mx-1">Increment1</Button>
      <Button onClick={handleClick2} variant='danger' className="mx-1">Increment2</Button>
    </div>
  );
}