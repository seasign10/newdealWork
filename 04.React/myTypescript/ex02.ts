// 타입 주석
// let 변수명: 타입 [= 초기값]; // 초기값 생략 가능, 타입 생략 불가
// const 변수명: 타입 = 초기값; // const(상수) 선언은 초기값 필수, 반드시 할당
//===> 이런 형태로 사용하는 것을 타입 주석이라고 한다.

let 이름:string='Hong';
console.log(이름);
// 이름=123 // 숫자 재할당 : error [x]
이름='123' // 문자열 재할당 : ok [o]
console.log(이름);

// let num:number;
let num:number|undefined; // undefined를 허용하는 number 타입
// const PI:number; // 초기 값을 생략하면 에러 발생
const PI:number=3.14;
console.log(num); // 타입을 지정만 해주고 값을 할당하지 않으면 에러 발생
console.log(PI);

// 자바스크립트의 기본자료형 : number, string, boolean, null, undefined
// 자바스크립트의 객체 유형 : object, array, function
// 타입스크립트의 기본자료형 : number, string, boolean, null, undefined, symbol
// 타입스크립트의 객체 유형 : object, array, function, tuple, enum, any, void, never, unknown

// names 변수 선언하고 string유형의 배열 타입으로 선언해보세요.
let names:string[]=['Hong','GilDong','Hee','Sool'];// 문자열이 들어가는 배열 타입
console.log(names);

// age 변수 선언하고 적절한 타입 선언하여 값 할당
// height 실수값 할당
let age:number;
age=20;
let height:number=180.5;
console.log(age, height);

let isLogin:boolean=false;
console.log(isLogin); // false
isLogin=!isLogin;
console.log(isLogin); // true

let uesr:object={};
console.log('user: ',uesr); // {} 빈 객체
 // 객체 유형에 특정 속성을 필수로 정의하고 싶을 때
 // interface를 선언, 해당 인터페이스 타입을 주면 된다.
interface User{
    name:string;
    age:number;
    height?:number; // 선택속성(option)
    isValid:boolean;
}
let user:User={
    name:'Hong',
    age:20,
    isValid:true
}
console.log('user: ',user);
// let user2:User={}; // [x] error : 필수 속성이 없어서 에러 발생