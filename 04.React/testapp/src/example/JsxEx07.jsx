import {useState} from 'react';

const OurComp=()=>{
    // 일반 데이터
    let bgcolor='orange';
    
    // state 데이터
    const [mycolor, setMyColor]=useState('green');
    const [flag, setFlag]=useState(false);

    const handleClick1=()=>{
        // bgcolor 변경
        bgcolor='lime';
        // 일반 데이터의 경우 값이 변경되어도 화면이 다시 그려지지는 않는다.
        console.log('bgcolor:', bgcolor);
    }
    const handleClick2=()=>{
        // mycolor 변경 ==> state
        // state 데이터는 직접 변경이 불가능
        let cr = (flag) ? 'green' : 'blue' ;

        // let cr = 'blue';
        // if(!flag){
        //     cr = 'blue';
        // }else{
        //     cr = 'green';
        // }
        setMyColor(cr);
        setFlag(!flag);
        // state 데이터의 경우 값이 변경되면 화면이 리렌더링 된다.
    }
    
    return (
        <div>
            <button 
            style={{backgroundColor:bgcolor}}
            onClick={handleClick1}
            >좋아요1</button>

            <button 
            style={{backgroundColor:mycolor}}
            onClick={handleClick2}
            >좋아요2</button>
            {/* 좋아요2 버튼을 누르면, green색과 blue색이 번갈아
            배경색에 나오도록 state 활용 */}
        </div>
    )
}
export default OurComp;