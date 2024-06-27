// makeRandomNum() 함수를 구성
// Math.random() 함수를 이용하여 0.0<= val < 1.0 사이의 난수를 생성하는 함수 구성하고 export

export function makeRandomNum():number{
  let num:number=Math.random();
  return num;
}

// makeRandomNum2(max, start)
// start <= value < max 사이의 랜덤한 정수값 반환하는 함수
// Math.random * (max-start) + start
export function makeRandomNum2(max:number=100, start:number=0):number{
  let bound:number=max-start;
  let num:number=Math.floor(Math.random()*bound)+start;
  return num;
}

// 화살표 함수로 makePerson() 함수 구성
// 매개변수 name, age를 받되, age의 기본값을 makeRandomNum2() 함수를 이용하여 할당
// makePerson() 함수의 반환타입은 IPerson 타입으로 지정
export interface IPerson{
  name:string;
  age:number;
}
export const makePerson = (name:string, age:number=makeRandomNum2()):IPerson=>{
  return {name, age}
}
// 소괄호로 감싸면 return 생략 가능
export const makePerson2 = (name:string, age:number=makeRandomNum2()):IPerson=>(
  {name,age}
)

export const range = (start: number, end: number): number[] => {
  let array = start < end ? [start, ...range(start + 1, end)]:[];
  return array;
}
