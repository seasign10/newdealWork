// comma(,) object(객체) : key-value 쌍으로 이루어진 데이터 집합
// interface는 ;(세미콜론)으로 속성을 구분
interface Member{
  no:number;
  name:string;
  userid:string;
  passwd:string;
}

let user1:Member = {
  no:1,
  name:'Hong',
  userid:'Gildong123',
  passwd:'h1234'
}
console.log('user1: ',user1);

// interface가 interface를 상속받을 때는 extends 키워드 사용
// 클래스가 interface를 상속받을 때는 implements 키워드 사용
interface Employee extends Member{ // Employee는 Member를 상속받음
  profile:string[];
}
// Employee 타입의 변수 선언하고 값을 할당
let emp1:Employee = {
  no:2,
  name:'김팀장',
  userid:'kim123',
  passwd:'kk11',
  profile:['팀장','개발팀']
}
console.log('emp1: ',emp1);
console.log('emp1.name: ',emp1.name);
// emp1의 profile은 반복문으로 출력해보자
for(let i:number=0;i<emp1.profile.length;i++){ // :number 생략 가능: 타입추론으로 인해 js에 최적화된 코드로 변환
  console.log(`emp1.profile[${i}]: ${emp1.profile[i]}`);
}

// 익명의 interface
// 1. interface라는 키워드를 사용하지 않고 이름 없는 interface를 만든다.
// 2. 주로 함수 구현에 사용하며, 변수에 직접 interface를 선언하여 사용
// 3. 함수의 매개변수나 리턴값으로 사용하며 재활용이 낮은 경우 사용(1회용)
let teacher:{
  no:number;
  name:string;
  subject?:string; // ? : 선택속성(option) !== 필수속성
  etc?:boolean;
} = {
  no:3,
  name:'이선생',
  subject:'수학',
  etc:true
}
console.log('teacher: ',teacher);

// function showInfo(user:interface이름)
// 아래의 경우에는 익명의 Interface를 사용하여 함수의 매개변수로 사용
function showInfo(user:{name:string, age:number, etc?:boolean}):void{
  // return 값이 없는 함수는 void 타입으로 선언 (반환값을 가질 수 없다)
  console.log(user.etc? `name: ${user.name}, age: ${user.age} ect: ${user.etc}` : `name: ${user.name}, age: ${user.age}, etc: ${user.etc}`);
}
// showInfo() 호출
showInfo({name:'송춘환', age:72, etc:true});
showInfo({name:'남궁복춘', age:45});

// type 키워드를 이용해서 타입을 선언할 수 있다.
// type은 주로 기본자료형(number, string, boolean ...) 정의를 단순하게 표현할 때 사용
// interface와의 차이점 : type은 상속이 불가능
// 합집합, 교집합을 이용해서 복잡한 타입 정의시에 사용
type Person={
  name:string;
  height:number;
}
let p1:Person={name:'아무개', height:180.5};
type Emp = Person & { // 교집합
  jobTitle:string;
}
let emp2:Emp = {...p1, jobTitle:'의사'};
console.log('emp2: ',emp2);
