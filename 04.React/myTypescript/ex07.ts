/*
  함수 구성
  [1] function 을 이용한 함수 구성
  [2] 리터럴 방식 arrow function을 이용한 함수 구성
*/

// [1] function 을 이용한 함수 구성
function plus(a:number, b:number):number{
  let c:number=a+b;
  console.log(`a: ${a}, b: ${b}, a+b: ${c}`);
  return c;
}
plus(10, 20);

// [2] 리터럴 방식 arrow function을 이용한 함수 구성
// 곱셈
const multiply = (a:number, b:number)=>{
  let c:number=a*b;
  console.log(`a: ${a}, b: ${b}, a*b: ${c}`);
  return c;
}
multiply(10, 20);

// 함수 시그니처 (함수 타입 선언) : 함수 타입을 함수 시그니처라고 한다.
// (매개변수1, 타입1, 매개변수2, 타입2, ...) => 반환값 타입
// void : 반환값이 없는 경우 사용
let bar:(a:string, b:number)=>void = function(str, num):void{
  for(let i=0; i<num; i++){
    console.log(str);
  }
};
// void를 사용하지 않고 string|number를 사용하여 반환값을 지정할 수 있다.
let ex:(a:string, b:number)=>string|number = function(str, num):string|number{
  return `${str} ${num}`;
};
console.log(ex('String', 10));
bar('@@@@@', 3);

let greeting:(name:string)=>string = function(name):string{
  return `Hello, ${name}`;
}
console.log(greeting('Johny'));

// 나누기를 수행하는 divide 함수 시그니처 이용하여 구성한 뒤 호출
/* 
  let diveide:(a:number, b:number)=>void;
  divide = (a:number, b:number):void=>{
    console.log(a/b);}
*/
let divide:(a:number,b:number)=>number = function(a, b):number{
  return a/b;
}
console.log(divide(10, 2)); // 5

// 매개변수가 없는 함수 시그니처
let logHello:()=>void;
logHello = function():void{
  console.log('Hello');
}
/*
logHello = ():void=>{
  console.log('Hello');
}

매개변수가 없기 때문에
logHello('Hello'); // [x] Error
logHello(); // [o] Hello
*/


// 선택적 매개변수를 갖는 함수 시그니처
let greetingOptionAge: (name:string, age?:number)=>string;
greetingOptionAge = function(nm:string, ag?:number):string{
  if(ag){
    return `Hello, ${nm}. You are ${ag} years old.`;
  }else{
    return `Hello, ${nm}.`;
  }
}
let msg = greetingOptionAge('Johny', 30);
console.log(msg);
msg = greetingOptionAge('Chris');
console.log(msg);


// type 키워드로 타입 별칭 만들기
// type 새로운 타입명 = 기존타입
// ==> type alias

type Name = string; // string 타입을 Name으로 별칭
type Money = number; // number 타입을 Money로 별칭

let myName:Name = 'Tom';
let giveMe:Money = 1000;
console.log(myName, giveMe);

// Union Type alias
type ID=string|number;
let uid1:ID = "ABCD1234";
let uid2:ID = 1234;
console.log(uid1, uid2);

// 함수 타입 앨리어스 : 함수의 타입을 정의하는 방법
type srtNumFunc = (arg0:string, arg1:number)=>void;
let f1:srtNumFunc = function(arg0, arg1):void{
  console.log(
    `${arg0} is ${arg1}cm`
  );
}
f1('Brian', 178);