import { makeRandomNum, makeRandomNum2, makePerson, makePerson2 } from "./myUtil";
for(let i=0;i<3;i++){
  console.log(makeRandomNum());
}

console.log(makeRandomNum2(10, 1));

// 1보다 크거나 같고 10보다 작은 랜덤한 정수값을 출력
console.log(Math.floor(Math.random()*10)+1);
// 2보다 크고 10보다 작거나 같은 랜덤한 정수값을 출력
console.log(Math.floor(Math.random()*8)+2);

// defualt 값이 설정된 매개변수는 생략 가능
// console.log(makePerson2(23); // [x] name은 default 값이 없으므로 생략 불가\
console.log(makePerson('Jack')); // 나이를 넣지 않으면 랜덤 값으로 설정
console.log(makePerson('Jane', 23));

// 배열
// let 변수명 = new Array(배열길이);
// let 변수명 = new Array(); // 빈 배열
// let 변수명 = new Array(값1, 값2, 값3);
// let 변수명 = [값1, 값2, 값3];

// let 변수명:Array<타입>
let arr:Array<string> = new Array(3);
console.log(arr); // [ <3 empty items> ] : [undefined, undefined, undefined]
arr[0]='도널드';
arr[1]='데이지';
arr[2]='미키';
console.log(arr); // [ '도널드', '데이지', '미키' ]

let arr2:Array<string> = new Array(3);
console.log({...arr2, ...arr}); // { '0': '도널드', '1': '데이지', '2': '미키' }

arr.push('미니'); // 배열의 끝에 요소 추가
arr.unshift('구피') // 배열의 앞에 요소 추가
console.log(arr); // [ '구피', '도널드', '데이지', '미키', '미니' ]

console.log(typeof arr); // object
let obj={name:'설리반', age:23};
console.log(typeof obj); // object
// Array.isArray(배열명): 배열인지 확인, flase면 객체
console.log('Array.isArray(arr):', Array.isArray(arr)); // Array.isArray(arr): true
console.log('Array.isArray(obj):', Array.isArray(obj)); // Array.isArray(obj): false

// 배열 마지막 요소 제거
arr.pop();
console.log(arr); 

// 배열 첫번째 요소 제거
arr.shift();
console.log(arr);

// 특정 위치 요소 제거
// splice(시작위치, 제거할 요소 개수)
arr.splice(1,2);
console.log(arr);
