import Comment from './example/JsxEx09';
import { useState } from 'react';

const App=()=>{
    let arr=[
        {name:'홍길동', title:'저도 어렵네요..'},
        {name:'이몽땅', title:'밥줘 간식줘 놀아줘.'},
        {name:'김아무개', title:'열심.이. 해.봅시,다.^^'},
        {name:'똘똘이', title:'머하냐'},
    ];
    const [replyList, setReplyList]=useState(arr);
    // 배열 .map((요소, 인덱스)=>{}) : 배열의 요소를 하나씩 꺼내서 함수를 실행시킨다.
    // map 함수는 배열에 저장되어 있는 요소만큼 반복문을 실행하면서, 
    // 안의 콜백함우세 저장되어있는 배열요소를 첫번째 인수로 전달하고, 인덱스 번호는 두번째 인수로 전달한다.
    // 이를 전달받아 가공하여 새로운 배열을 반환할 수 있다.
    return(
        <div className="container py-5">
            <h1 className="text-center mb-5">Board View</h1>
            <p className="alert alert-dark text-dark">
                React. 정말 어렵군요. <br />
                후훗. 만만하게 볼 녀석이... 아니군. <br />
                아주 재미있는 녀석이군요. <br />
                </p>
            <hr />
            {
                replyList.map((reply, idx)=>{
                    return (
                        // 반복문을 실행할 때, key 속성을 넣어줘야 고유값으로 인해 오류가 발생하지 않는다.
                        <Comment key={idx} {... reply} />
                        // <Comment {... reply} />
                    )
                })
            }
        </div>
    )
}
export default App;