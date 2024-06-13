import React, {useState, useEffect} from 'react';

export default function Clock() {

  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  // console.log('date', date);
  // console.log('time', time);
  useEffect(()=>{
    const timerId = setInterval(()=>{
      console.log('setInterval');
      setTime(new Date().toLocaleTimeString())
      if(date !== new Date().toLocaleDateString()){
        setDate(new Date().toLocaleDateString());
      }
    }, 1000);

    return ()=>{
      // 이 안에서 setInterval 해제 => 메모리 누수 방지 : clearInterval(id)
      clearInterval(timerId)
    }
  },[]);
  // useEffect와 setInterval 동시 사용 시, setInterval이 계속 실행되는 문제가 발생하므로 []를 넣어준다.

  // setTimer(callback, ms) : 일정 시간 후에 작업을 수행하기 위해 사용
  // 함수를 밀리초가 지난 후 한 번 실행
  // setInterval(callback, ms) : 일정 시간 간격으로 작업을 수행하기 위해 사용
  // 함수를 밀리초 간격으로 계속 실행
  // clearInterval() : setInterval()을 취소하기 위해 사용

  return (
    <div className="text-center py-5">
      <h1>{date}</h1>
      <hr />
      <h2>현재 시각은 <br /> <span className='text-danger'>{time}</span> 입니다.</h2>
    </div>
  );
}
