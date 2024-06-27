import React, {FC} from 'react'; // FC : 함수형 컴포넌트를 정의하기 위해서 필요
import EventComp from './component/EventComp';

const App02:FC = ()=>{

  return(
    <div>
      <h1 style={{textAlign: 'center'}}>App02 - 이벤트 처리</h1>
      <hr />
      <EventComp />
    </div>
  )
}

export default App02;