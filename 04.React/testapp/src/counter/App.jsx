import Viewer from "./Viewer"
import Controller from "./Controller"
import {useState} from 'react';
import './counter.css'


export default function App(){
    // 계층 관계에 있을 때 state 데이터는 부모 컴포넌트에서 관리하는 것이 좋다.
    const [count, setCount] = useState(0);

    // Viewer에 count state를 props로 전달
    // Viewer에서 전달 받은 props를 사용하여 count 출력

    // 부모 ==> 자식에게 데이터 전달: props로 전달
    // 자식 ==> 부모에게 데이터 전달: event로 전달
    const handleCount = (val)=>{
        setCount(count + val);
    }
    return (
        <div className="App">
            <h1>Simple Counter</h1>
            {/* 값 이름={값} || 값 */}
            <Viewer mycount={count} />
            <br />
            <Controller handleCount={handleCount} />
        </div>
    )
}