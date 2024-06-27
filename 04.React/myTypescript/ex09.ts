import { range } from './myUtil';

// numArr에 저장된 요소(element,item)들의 합계와 평균 출력
let numArr:number[]=[1, 2, 3, 4.56, 7.89];
let sum:number = 0;
numArr.forEach((num:number):void=>{
  sum += num;
});
const avg:number = sum / numArr.length;
console.log(`
  합계: ${sum}
  평균: ${avg}
  `);


// persons에 저장된 사람들의 이름, 나이, 연락처 출력
type Person = {name:string, tel?:string, age:number};
let persons:Person[] = [
  {name: '로미오', age: 20, tel: '010-1234-5678'},
  {name: '줄리엣', age: 22},
  {name: '빠삐용', age: 30}
];
persons.map((person):void=>{
  const {name, age, tel} = person;
  console.log(`
    이름: ${name}
    나이: ${age}
    ${tel? `연락처: ${tel}`:''}
    `);
});

// 반복문 종류
// 1. for(변수 in 객체){} 루프문 ==> 속성명이 변수에 들어감(배열은 index)
for(let index in persons){
  console.log(persons[index]); // persons[index].name ... 
}// 인덱스를 이용하여 요소에 접근
for(let props in persons[0]){
  console.log(props); // name, tel, age
} // 객체의 속성명에 접근

// 2. for(변수 of 객체){} 루프문 ==> 요소가 변수에 들어감 (인덱스가 아님)
for(let person of persons){
  console.log(person);
} // 콜백함수의 요소처럼 사용 가능


// Car type 선언 > Car 속성으로 model, capacity 속성 선언
// Car타입의 배열을 선언하고 배열에 해당 유형의 요소를 저장
// map()함수 이용 > 배열을 순회하면서 자동차 정보 출력
type Car = {model:string, capacity:number};
let c1:Car = {model: '소나타', capacity: 2000};
let carArr:Car[] = [
  {model: '그랜저', capacity: 2200},
  {model: '모닝', capacity: 800}
];
carArr.map(obj=>{
  console.log(`
    모델: ${obj.model}
    배기량: ${obj.capacity}
    `);
});

// range()함수 선언
// 시작값, 끝값, 증가값을 매개변수로 받아 시작값부터 끝값까지 증가값만큼 증가하는 배열을 반환
// 1에서 5까지
let arr2 = range(1,5);
console.log(arr2);
// 15에서 27까지
let arr3 = range(15, 27);
console.log(arr3);

// 5를 제외한 배열을 반환
let arr4 = range(1, 11);
let tmp:number[]=arr4.filter((value)=>value!==5);
console.log(tmp);

// 1~10 누적합 > reduce()함수
// 함수형태 : reduce(callback, 초기값):값
// 배열의 값을 함산, 곱셈 또는 객체를 구성하거나 다른 형태의 작업을 수행하는 함수
// [1] 콜백함수 > reduce 함수 (accumulator, currentValue, [currentIndex], [array])
// accumulator : 누적값, currentValue : 현재값, currentIndex : 현재 인덱스, array : 배열
// [2] 초기값
const sum2:number = arr4.reduce((acc, cur):number=>{
  console.log(`acc: ${acc}, cur: ${cur}`);
  let n = acc + cur;
  return n;
}, 0); // 0 : 초기값
console.log(`1~10까지 누적합: ${sum2}`);

// arr4에 저장된 요소돌의 누적곱
const mul:number = arr4.reduce((acc, cur):number=>{
  return acc * cur;
}, 1);
console.log(`1~10까지 누적곱: ${mul}`);

type Product = {item:string, price:number};
let cart:Product[] = [
  {item: '바나나', price: 1200},
  {item: '사과', price: 1500},
  {item: '딸기', price: 1800}
];
// 1. Product 객체 3개를 cart 배열에 저장
// 2. reduce함수 이용해서 총 구매가격 출력
const totalPrice:number = cart.reduce((arr, cur):number=>{
  return arr + cur.price;
}, 0);
console.log(`총 구매가격: ${totalPrice}`);
