import React, {useState} from 'react';
import { log } from 'three/examples/jsm/nodes/Nodes.js';

export default function Clock() {

  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  // console.log('date', date);
  // console.log('time', time);

  // setTimer(callback, ms) : 일정 시간 후에 작업을 수행하기 위해 사용
  setInterval(()=>{ // setInterval(callback, ms) : 일정 시간 간격으로 작업을 수행하기 위해 사용
    setTime(new Date().toLocaleTimeString());
    if(date !== new Date().toLocaleDateString()){
      setDate(new Date().toLocaleDateString());
    }
  }, 1000);

  return (
    <div className="text-center py-5">
      <h1>{date}</h1>
      <hr />
      <h2>현재 시각은 <br /> <span className='text-danger'>{time}</span> 입니다.</h2>
    </div>
  );
}
