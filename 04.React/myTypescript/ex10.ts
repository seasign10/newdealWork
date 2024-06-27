// Tuple : 배열과 유사하나, 타입과 길이가 고정된 배열을 표현할 수 있는 자료형
// 각 위치마다 다른 타입을 가질 수 있다.
let t1:[string, number];
t1 = ['hello', 10]; // OK
// t1 = [10, 'hello']; // Error
console.log(t1);
console.log(t1[0]);
console.log(t1[1]);

// t2를 튜플로 선언, string, number, boolean 유형을 갖도록 타입 선언
// 그에 맞는 값 할당
let t2:[string, number, boolean] = ['hello', 10, true];
for(let i=0; i<t2.length; i++){
    console.log(t2[i]);
}
// 튜플 요소 수정
t2[0] = 'world';
t2[1] = 20;
t2[2] = false;
console.log(t2);

// 함수에서 여러 값을 반환할 때 사용
function getUserInfo():[string, number]{
  return ['홍길동', 23];
}
let u1:[string, number] = getUserInfo();
console.log(u1); // [ '홍길동', 23 ]
console.log(u1[0]); // 홍길동

// 튜플의 선택적 요소
let tuple1:[string, number?];
tuple1 = ['hello', 10];
tuple1 = ['hello'];

// 튜플에서 전개 연산자 사용
let tuple2:[string, ...number[]]; // number 타입의 배열
// 첫번째 요소는 문자열(필수), 나머지 요소는 가변적인 숫자 배열이 올 수 있다는 의미
tuple2 = ['hello', 10, 20, 30];
console.log(tuple2); // [ 'hello', 10, 20, 30 ]
tuple2 = ['bye'];
console.log(tuple2); // [ 'bye' ]
// tuple2 = [123, 'hi']; // [x]

// 첫번째 인자로 숫자, 두번째 인자로 가변적인 문자열을 매개변수로 받는 함수
// 매개변수를 받아서 튜플로 반환
// 함수명 : createTuple
function createTuple(v1:number, ...v2:string[]):[number, ...string[]]{
    return [v1, ...v2];
};
// 함수 호출
console.log(createTuple(100));
console.log(createTuple(200, 'hello', 'world', 'typescript'));

//  매개변수로 튜플 사용
function printTuple(args:[string, ...number[]]):void{
  console.log(args[0].toUpperCase()); // 대문자로 출력
  for(let i=0; i<args.length; i++){
    console.log(`args[${i}] = ${args[i]}`);
  }
}
printTuple(['hello', 10, 20, 30]);