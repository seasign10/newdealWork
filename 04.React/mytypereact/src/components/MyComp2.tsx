// 함수형 컴포넌트
import React from 'react';
type GreetingProps = {
  name: string;
  color?: string;
};

const Greeting:React.FC<GreetingProps> = (props:any)=>{
  const {name, color} = props;
  return(
    <h2 style={{color: color}}>Hello {name}</h2>
  )
};

export default Greeting;