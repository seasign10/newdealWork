import {useState} from 'react';
// 함수형 컴포넌트에서는 state를 useState 훅(Hook)을 사용하여 구현(관리)한다.
// cosnt [state변수명, setXxx] = useState(초기값);

const HisComp = () => {
    const [name, setName] = useState('이짜루');
    const [isLoagin, setLogin] = useState(false);

    const onClickHandler = () => {
        // state 값을 변경하고 싶을 때는 setXxx() 함수를 사용
        setLogin(!isLoagin);
    }
    // option1 && option2
    // option1이 true일 때 option2를 실행
    // option1이 false일 때 option2를 실행하지 않음

    //option1 || option2
    // option1이 true일 때 option2를 실행하지 않음
    // option1이 false일 때 option2를 실행
    return (
        <div style={{padding:'2rem', textAlign:'center'}}>
            {
                isLoagin&&
                <h1 style={{color: 'green'}}>{name}님 로그인 중...</h1>
            }
            {
                !isLoagin&&
                <h1 style={{color: 'blue'}}>로그인 하세요</h1>
            }
            <br /> 
            {/* onClickHandler()로 표기하게되면 바로 호출이 되고, 클릭시 호출이 안됨 */}
            <button onClick={onClickHandler}>Toggle</button>
            {/* 그럼 props를 내려받고 싶을 때는? */}
            {/* 화살표 함수를 사용하여 내려 받는다. */}
            <button onClick={()=>{
                // onClickHandler(value)
            }}>Toggle</button>
        </div>
    )
}
export default HisComp;