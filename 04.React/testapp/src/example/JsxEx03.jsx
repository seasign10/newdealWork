function GetLang(){
    return <h3>제가 사용하는 언어는 JS, ReactJS 입니다.</h3>
}
export function GetPet(){
    return <h3>제가 키우는 반려동물은 고양이입니다.</h3>
}
export default GetLang;
// default로 내보내는 컴포넌트는 1개만 가능

// import 하는 쪽에서는 default로 내보낸 컴포넌트는 {} 없이 import 가능하며, 이름을 마음대로 정할 수 있음
// import GetLang from './example/JsxEx3';

// 하지만 default로 내보낸 컴포넌트가 아닌 경우에는 {} 안에 정확한 이름을 적어서 import 해야 함
// import {GetPet} from './example/JsxEx3';