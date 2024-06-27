import {IEmp, ICmp} from './ex06_1'

// Employee 객체 생성
let kim:IEmp = {
  empId: 1,
  empName: '김인턴',
  empSal: 230,
  empDep: '사무',
  empJoinDate: new Date(),
  empActive: true
}
let lee:IEmp = {
  empId: 2,
  empName: '이과장',
  empSal: 300,
  empDep: '경영',
  empJoinDate: new Date(),
  empActive: true
}
let park:IEmp = {
  empId: 3,
  empName: '박대리',
  empSal: 250,
  empDep: '인사',
  empJoinDate: new Date(),
  empActive: true
}

// Company 객체 생성
let apple:ICmp = {
  cmpId: 1,
  cmpName: 'Apple',
  cmpLocation: 'Cupertino',
  cmpEmps: [kim, lee]
}
let samsung:ICmp = {
  cmpId: 2,
  cmpName: 'Samsung',
  cmpLocation: 'Seoul',
  cmpEmps: [park]
}
console.log(apple);
console.log(samsung);

// 비구조화 할당
let {cmpName, cmpLocation} = apple; // apple 객체의 cmpName, cmpLocation 속성을 추출
console.log(cmpName, cmpLocation); // apple.cmpName, apple.cmpLocation 출력

// spread 연산자 (전개연산자, 잔여 연산자)
// 전개 연산자는 객체나 배열을 복사할(펼칠) 때 사용
// 잔여 연산자는 객체나 배열에서 나머지 일부 속성을 추출할 때 사용
let address:any={
  nation: 'Korea',
  city: 'Seoul',
  addr1: 'Dongdaemun-gu',
  addr2: 'Janchung-dong',
  addr3: '123-456 번지'
}
const {nation, city, ...rest} = address;
console.log(nation, city);
console.log(rest);

const arr=[1,2,3,'Hello'];
console.log(arr);

const arr2:number[]=[10,20,30];
// 스프레드 연산자 이용한 배열 copy(깊은 복사)
const copyArr=[...arr2]; // 원본 영향 x (전개 연산자)
console.log(`arr2: ${arr2} copyArr: ${copyArr}`);
copyArr[1]=200;
console.log(`arr2: ${arr2} copyArr: ${copyArr}`);
// arr2에 영향을 주지 않고 copyArr에만 값이 적용됨

copyArr.map((val, i)=>{console.log(val);
});

// spread 연산자를 이용한 객체 병합
let char={name: '도우너', age: 200};
let location={nation: 'Korea', city: 'Seoul'};
let merged={...char, ...location};
console.log(merged);
// 문자열을 스프레드 연산자로 풀면 문자 단위로 분리됨

// 타입 단언(Type Assertion) > 형변환(타입 변환)
// 타입 단언은 컴파일러에게 '이 변수는 이 타입이다'라고 알려주는 것
let char2:object = {name: '또치', age: 7}
console.log(char2);
// console.log(char2.name); // [x] object 타입이므로 name 속성애 접근 불가
// interface나 타입 단언을 사용하여 타입을 지정해줘야 함 (형변환 필요)
// (<타입>객체) 형태 또는 (객체 as 타입) 형태로 사용
console.log((<{name:string, age:number}>char2).name);
console.log((char2 as {name:string, age:number}).age);

interface IChar{
  name: string;
  age: number;
}
// (<interface>객체).속성명
console.log((<IChar>char2).name);
console.log((<IChar>char2).age);
// (객체 as interface).속성명
console.log((char2 as IChar).name);



